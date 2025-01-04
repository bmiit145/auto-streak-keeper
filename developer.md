# Auto-Streak Keeper

A GitHub Action to automatically maintain GitHub streaks by creating and updating a file multiple times daily.

---

## **For Developers: Deployment Steps**

### **Before Publishing**
Follow these steps to prepare and release a new version of the **Auto-Streak Keeper** action:

1. **Install Dependencies**:
   Ensure you have the required dependencies installed:
   ```bash
   npm install
   ```

2. **Bundle Dependencies**:
   Use `@vercel/ncc` to bundle all dependencies into a single file for distribution:
   ```bash
   npx @vercel/ncc build index.js --license licenses.txt
   ```

3. **Update `action.yml`**:
   Ensure the `main` field in `action.yml` points to the bundled file:
   ```yaml
   runs:
     using: "node20"
     main: "dist/index.js"
   ```
---

## **Inputs**

- **`file-path`** (optional): Path to the file to create/update. Default: `public/auto-streak/data.txt`.
- **`min-commits`** (optional): Minimum number of commits daily. Default: `1`.
- **`max-commits`** (optional): Maximum number of commits daily. Default: `15`.
- **`commit-message`** (optional): Commit message for the updates. Default: `Auto-streak update`.
- **`user-name`**: GitHub username. Default: `${{ secrets.GITHUB_USER_NAME }}`.
- **`user-email`**: GitHub user email. Default: `${{ secrets.GITHUB_USER_EMAIL }}`.
- **`github-token`**: GitHub token. Default: `${{ secrets.GITHUB_TOKEN }}`.


you can set a secrets at repo setting. 
---

## **Example Usage**

```yaml
name: Maintain GitHub Streak

on:
  schedule:
    - cron: "0 0 * * *" # Runs daily at midnight
  workflow_dispatch:

jobs:
  auto-streak:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Run Auto-Streak Keeper
        uses: bmiit145/auto-streak-keeper@v1.0.1
        with:
          file-path: "public/auto-streak/data.txt"
          min-commits: 2
          max-commits: 5
          commit-message: "Daily streak maintenance"
          user-name: ${{ secrets.GITHUB_USER_NAME }}
          user-email: ${{ secrets.GITHUB_USER_EMAIL }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## **Testing the Action**

1. Create a `.github/workflows` folder in a test repository.
2. Add a workflow YAML file (e.g., `auto-streak.yml`).
3. Push the changes and verify the action works as expected.

---

## **Publishing Updates**
To publish a new version of the **Auto-Streak Keeper** action:

1. Follow the **deployment steps** above.
2. Increment the version tag (e.g., `v1.0.1 -> v1.0.2`).
3. Update the action version in any workflows using it.

---

This ensures the **Auto-Streak Keeper** is not only user-ready but also easy for developers to maintain and enhance. Let me know if you need further adjustments!