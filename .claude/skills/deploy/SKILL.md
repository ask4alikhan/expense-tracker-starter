---
name: deploy
description: Run tests, build for production, and push to the staging area
disable-model-invocation: true
allowed-tools: Bash(npm run *) Bash(git push *)
---

Deploy the application to staging by running these steps in order. Stop immediately if any step fails.

1. **Run all tests**: `npm test`
2. **Build production bundle**: `npm run build`
3. **Deploy to staging**: `npm run deploy:staging`
4. **Push to staging**: `git push origin main:staging`

Report the result of each step. If any step fails, show the error and do not continue.
