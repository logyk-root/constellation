# AWS Amplify Deployment Guide

## Prerequisites
- [x] AWS CLI installed and configured
- [x] AWS account with appropriate permissions
- [x] GitHub repository with code pushed

## Deployment Options

You have two ways to deploy to AWS Amplify:

### Option A: Amplify Console (Recommended - Easiest)
Fully managed CI/CD with automatic deployments from GitHub.

### Option B: Amplify CLI
More control, deploy from your local machine.

---

## Option A: Amplify Console (GitHub Integration)

### Step 1: Access Amplify Console
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**

### Step 2: Connect Repository
1. Choose **GitHub** as your Git provider
2. Authorize AWS Amplify to access your GitHub account
3. Select repository: **logyk-root/constellation**
4. Select branch: **main**
5. Click **Next**

### Step 3: Configure Build Settings
1. App name: **stellar-loans-web**
2. Environment: **production** (or **dev** for testing)
3. The `amplify.yml` file will be auto-detected ✅
4. Advanced settings:
   - Build image: **Amazon Linux 2023** (default)
   - Add environment variables if needed (none required for now)
5. Click **Next**

### Step 4: Review and Deploy
1. Review all settings
2. Click **Save and deploy**
3. Wait 5-10 minutes for initial build

### Step 5: Custom Domain (stellarloans.io)
After successful deployment:

1. In Amplify Console, go to **Domain management**
2. Click **Add domain**
3. Enter: **stellarloans.io**
4. Configure subdomains:
   - `stellarloans.io` → production
   - `www.stellarloans.io` → production (redirect)
5. Amplify will provide DNS records (CNAME or ANAME)
6. Add these records to your domain registrar
7. Wait for SSL certificate (automatic, ~15 minutes)

**DNS Records Example:**
```
Type: CNAME
Name: www
Value: <amplify-provided-value>

Type: ANAME/ALIAS
Name: @
Value: <amplify-provided-value>
```

### Step 6: Verify Deployment
Visit your Amplify URL (e.g., `https://main.xxxxxx.amplifyapp.com`)

---

## Option B: Amplify CLI Deployment

### Step 1: Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
```

### Step 2: Initialize Amplify Project
```bash
cd /mnt/c/Users/xclon/code/constellation

# Initialize Amplify
amplify init
```

**Answer prompts:**
```
? Enter a name for the project: stellarloans
? Initialize the project with the above configuration? Yes
? Select the authentication method: AWS profile
? Please choose the profile you want to use: default
```

### Step 3: Add Hosting
```bash
amplify add hosting
```

**Answer prompts:**
```
? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual deployment
```

### Step 4: Publish
```bash
cd apps/web
amplify publish
```

This will:
- Build your Next.js app
- Upload to Amplify
- Provide a live URL

### Step 5: Set Up CI/CD (Optional)
```bash
amplify console
```
Then configure GitHub integration in the web console.

---

## Free Tier Limits

AWS Amplify Free Tier (12 months):
- ✅ 1000 build minutes/month
- ✅ 15 GB served/month
- ✅ 5 GB storage

**Estimated usage for MVP:**
- Builds: ~5 min per build × 20 builds/month = 100 minutes/month
- Bandwidth: ~2-5 GB/month (for moderate traffic)
- **Cost: $0/month** (within free tier)

After 12 months:
- Build minutes: $0.01/minute
- Data transfer out: $0.15/GB
- **Estimated: $2-10/month** depending on traffic

---

## Environment Variables

If you need to add environment variables later:

### Via Console:
1. Go to Amplify Console
2. Select your app
3. **App settings** → **Environment variables**
4. Add key-value pairs

### Via CLI:
```bash
amplify env add
```

**Common variables you'll need later:**
```
NEXT_PUBLIC_API_URL=https://api.stellarloans.io
DATABASE_URL=<your-rds-postgres-url>
REDIS_URL=<your-elasticache-url>
AWS_REGION=us-east-1
```

---

## Monitoring & Logs

### View Build Logs:
1. Amplify Console → Your App
2. Click on latest build
3. View detailed logs for each phase

### Performance Monitoring:
1. Amplify Console → **Monitoring**
2. See traffic, latency, errors

### CloudWatch Integration:
```bash
# View logs via CLI
amplify console analytics
```

---

## Troubleshooting

### Build Fails
**Check:**
- Build logs in Amplify Console
- Ensure all dependencies are in `package.json`
- Verify `amplify.yml` is at repository root

**Common fixes:**
```bash
# Clear cache and rebuild
rm -rf node_modules .next
npm ci
npm run build
```

### Monorepo Issues
The `amplify.yml` is configured for Turborepo:
```yaml
buildSpec:
  monorepo:
    enabled: true
```

If builds fail, try:
```yaml
preBuild:
  commands:
    - cd apps/web
    - npm ci
build:
  commands:
    - cd apps/web
    - npm run build
```

### Domain Not Working
- Wait 15-30 minutes for DNS propagation
- Verify DNS records with: `dig stellarloans.io`
- Check SSL certificate status in Amplify Console

---

## Cost Optimization Tips

1. **Enable caching**: Already configured in `amplify.yml`
2. **Use environment branches**: Deploy `dev` to separate URL for testing
3. **Disable unused features**: Remove analytics if not needed
4. **Monitor usage**: Set up billing alerts

---

## Next Steps After Deployment

1. ✅ Verify landing page loads correctly
2. ✅ Test all components (calculator, FAQ accordion)
3. ✅ Check mobile responsiveness
4. ⬜ Set up custom domain (stellarloans.io)
5. ⬜ Configure Google Analytics
6. ⬜ Submit sitemap to Google Search Console
7. ⬜ Test page speed (aim for 90+ on Lighthouse)

---

## Quick Reference Commands

```bash
# Check Amplify status
amplify status

# View app in browser
amplify console

# Update and redeploy
git push origin main  # (if using Console with CI/CD)
# OR
amplify publish      # (if using CLI)

# View logs
amplify console analytics

# Delete app (if needed)
amplify delete
```

---

## Support

- [Amplify Documentation](https://docs.amplify.aws/)
- [Amplify Discord](https://discord.gg/amplify)
- [AWS Support](https://console.aws.amazon.com/support/)

**Your setup:**
- Repository: `https://github.com/logyk-root/constellation`
- Branch: `main`
- Framework: Next.js 14 (App Router)
- Build system: Turborepo
