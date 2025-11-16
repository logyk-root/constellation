# AWS Setup Guide for Constellation

This guide will help you set up AWS resources for Constellation, **optimized for the AWS Free Tier** where possible.

## Prerequisites

- AWS Account ([sign up here](https://aws.amazon.com/free/))
- AWS CLI installed and configured
- Basic understanding of AWS services

## Free Tier Summary

AWS Free Tier provides:
- **12 months** of free tier for some services (RDS, ElastiCache)
- **Always Free** for others (Lambda, SNS, SQS, EventBridge)

### What We'll Use (Free Tier Eligible)

| Service | Free Tier | Expected Usage (MVP) |
|---------|-----------|---------------------|
| **Lambda** | 1M requests/month | ~10K/month ✅ |
| **S3** | 5GB + 20K GET + 2K PUT | ~1GB + 5K requests ✅ |
| **RDS PostgreSQL** | 750 hrs/month (db.t3.micro) | 720 hrs/month ✅ |
| **ElastiCache** | 750 hrs/month (cache.t3.micro) | 720 hrs/month ✅ |
| **SNS** | 1M publishes | ~5K/month ✅ |
| **SQS** | 1M requests | ~10K/month ✅ |
| **CloudWatch** | 10 metrics + 5GB logs | Well within limits ✅ |
| **EventBridge** | 14M events/month | ~20K/month ✅ |

**Estimated Monthly Cost (after free tier):** $15-25/month

---

## Step 1: AWS CLI Setup

### Install AWS CLI

```bash
# macOS
brew install awscli

# Windows
# Download from: https://aws.amazon.com/cli/

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Configure AWS CLI

```bash
aws configure

# Enter when prompted:
# AWS Access Key ID: [Your access key]
# AWS Secret Access Key: [Your secret key]
# Default region: us-east-1
# Default output format: json
```

**Security Note:** Create an IAM user with programmatic access, don't use root credentials.

---

## Step 2: Create IAM User for Development

```bash
# Create IAM user
aws iam create-user --user-name constellation-dev

# Attach policies (adjust as needed)
aws iam attach-user-policy \
  --user-name constellation-dev \
  --policy-arn arn:aws:iam::aws:policy/PowerUserAccess

# Create access keys
aws iam create-access-key --user-name constellation-dev
```

Save the access key ID and secret access key securely.

---

## Step 3: RDS PostgreSQL Setup (Free Tier)

### Create Database

```bash
# Create DB instance (free tier eligible)
aws rds create-db-instance \
  --db-instance-identifier constellation-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.8 \
  --master-username postgres \
  --master-user-password YOUR_STRONG_PASSWORD \
  --allocated-storage 20 \
  --storage-type gp2 \
  --backup-retention-period 7 \
  --publicly-accessible false \
  --db-name constellation \
  --tags Key=Project,Value=Constellation Key=Environment,Value=dev
```

**Free Tier Notes:**
- ✅ db.t3.micro is free tier eligible
- ✅ 20GB storage is within free tier
- ✅ Single-AZ deployment (Multi-AZ costs extra)
- ⏰ 750 hours/month (run continuously for free)

### Get Database Endpoint

```bash
aws rds describe-db-instances \
  --db-instance-identifier constellation-db \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text
```

Save this endpoint - you'll need it for `DATABASE_URL`.

---

## Step 4: ElastiCache Redis Setup (Free Tier)

### Create Redis Cluster

```bash
# Create cache subnet group first
aws elasticache create-cache-subnet-group \
  --cache-subnet-group-name constellation-redis-subnet \
  --cache-subnet-group-description "Constellation Redis Subnet Group" \
  --subnet-ids subnet-xxxxx  # Use your VPC subnet ID

# Create Redis cluster (free tier eligible)
aws elasticache create-cache-cluster \
  --cache-cluster-id constellation-redis \
  --engine redis \
  --cache-node-type cache.t3.micro \
  --num-cache-nodes 1 \
  --engine-version 7.0 \
  --cache-subnet-group-name constellation-redis-subnet \
  --tags Key=Project,Value=Constellation
```

**Free Tier Notes:**
- ✅ cache.t3.micro is free tier eligible
- ✅ Single node (multi-node costs extra)
- ⏰ 750 hours/month

### Get Redis Endpoint

```bash
aws elasticache describe-cache-clusters \
  --cache-cluster-id constellation-redis \
  --show-cache-node-info \
  --query 'CacheClusters[0].CacheNodes[0].Endpoint.Address' \
  --output text
```

---

## Step 5: S3 Bucket Setup

### Create S3 Bucket

```bash
# Create bucket (replace with unique name)
aws s3api create-bucket \
  --bucket constellation-documents-dev \
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket constellation-documents-dev \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket constellation-documents-dev \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Block public access (security)
aws s3api put-public-access-block \
  --bucket constellation-documents-dev \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

**Free Tier:** 5GB storage + 20K GET + 2K PUT requests/month

---

## Step 6: SNS Topics & SQS Queues

### Create SNS Topics

```bash
# Credit events topic
aws sns create-topic --name constellation-credit-events

# Application events topic
aws sns create-topic --name constellation-application-events

# Lender events topic
aws sns create-topic --name constellation-lender-events
```

### Create SQS Queues

```bash
# Workflow queue (FIFO for ordering)
aws sqs create-queue \
  --queue-name constellation-workflow-queue.fifo \
  --attributes '{
    "FifoQueue": "true",
    "ContentBasedDeduplication": "true",
    "MessageRetentionPeriod": "345600",
    "VisibilityTimeout": "300"
  }'

# Analytics queue
aws sqs create-queue --queue-name constellation-analytics-queue

# Audit queue
aws sqs create-queue --queue-name constellation-audit-queue

# Notification queue
aws sqs create-queue --queue-name constellation-notification-queue
```

### Subscribe Queues to Topics

```bash
# Get topic ARN
TOPIC_ARN=$(aws sns list-topics --query 'Topics[?ends_with(TopicArn, `constellation-credit-events`)].TopicArn' --output text)

# Get queue ARN
QUEUE_ARN=$(aws sqs get-queue-attributes --queue-url https://sqs.us-east-1.amazonaws.com/YOUR_ACCOUNT_ID/constellation-workflow-queue.fifo --attribute-names QueueArn --query 'Attributes.QueueArn' --output text)

# Subscribe
aws sns subscribe \
  --topic-arn $TOPIC_ARN \
  --protocol sqs \
  --notification-endpoint $QUEUE_ARN
```

**Free Tier:** 1M SNS publishes + 1M SQS requests (more than enough for MVP)

---

## Step 7: Cognito User Pools

### Create User Pool

```bash
aws cognito-idp create-user-pool \
  --pool-name constellation-users \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": false
    }
  }' \
  --auto-verified-attributes email \
  --mfa-configuration OFF
```

### Create User Pool Client

```bash
aws cognito-idp create-user-pool-client \
  --user-pool-id us-east-1_XXXXX \
  --client-name constellation-web \
  --no-generate-secret
```

---

## Step 8: Environment Variables

Create `.env.local` files in your apps:

### apps/web/.env.local

```env
# Database
DATABASE_URL="postgresql://postgres:PASSWORD@your-db-endpoint.rds.amazonaws.com:5432/constellation"

# Redis
REDIS_URL="redis://your-redis-endpoint.cache.amazonaws.com:6379"

# AWS
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="123456789012"
S3_BUCKET="constellation-documents-dev"

# Cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID="us-east-1_XXXXX"
NEXT_PUBLIC_COGNITO_CLIENT_ID="xxxxxxxxx"

# APIs (you'll get these when you integrate)
CREDIT_BUREAU_API_KEY=""
NADA_API_KEY=""
KBB_API_KEY=""
```

---

## Step 9: Cost Monitoring Setup

### Set Up Billing Alerts

```bash
# Create SNS topic for billing alerts
aws sns create-topic --name billing-alerts

# Subscribe your email
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:billing-alerts \
  --protocol email \
  --notification-endpoint your-email@example.com
```

### Create CloudWatch Billing Alarm

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name constellation-monthly-cost-alarm \
  --alarm-description "Alert when monthly cost exceeds $50" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --evaluation-periods 1 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:billing-alerts
```

---

## Step 10: Lambda Execution Role

```bash
# Create IAM role for Lambda
aws iam create-role \
  --role-name constellation-lambda-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach policies
aws iam attach-role-policy \
  --role-name constellation-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

aws iam attach-role-policy \
  --role-name constellation-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy \
  --role-name constellation-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess

aws iam attach-role-policy \
  --role-name constellation-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSQSFullAccess
```

---

## Next Steps

1. ✅ All AWS resources are created
2. ✅ Free tier optimized
3. ✅ Billing alerts configured
4. 📝 Save all endpoints and IDs
5. 📝 Update environment variables
6. 🚀 Ready to deploy Lambda functions

---

## Estimated Monthly Costs (After Free Tier Expires)

| Service | Cost |
|---------|------|
| RDS db.t3.micro | $15/month |
| ElastiCache cache.t3.micro | $12/month |
| Lambda | $0 (well within free tier) |
| S3 | $1/month |
| Data transfer | $2/month |
| **Total** | **~$30/month** |

**During Free Tier (12 months):** ~$3/month (just S3 and data transfer)

---

## Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use IAM roles instead of access keys where possible
- ✅ Enable MFA on root account
- ✅ Rotate access keys every 90 days
- ✅ Use VPC security groups to restrict access
- ✅ Enable CloudTrail for audit logging

---

## Troubleshooting

### Can't connect to RDS?
- Check security group allows inbound on port 5432
- Ensure you're in the same VPC or use VPN/bastion host
- For development, consider enabling public access (not recommended for production)

### Redis connection issues?
- ElastiCache is VPC-only, Lambda must be in same VPC
- Check security group rules

### Lambda timeout?
- Increase timeout in Lambda configuration
- Check CloudWatch Logs for errors

---

## Support

For AWS-specific issues, refer to:
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Cost Calculator](https://calculator.aws/)
