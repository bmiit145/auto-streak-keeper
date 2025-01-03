# Auto-Streak Keeper

A GitHub Action to automatically maintain GitHub streaks by creating and updating a file multiple times daily.

## Inputs

- `file-path` (optional): Path to the file to create/update. Default: `public/auto-streak/data.txt`.
- `min-commits` (optional): Minimum number of commits daily. Default: `1`.
- `max-commits` (optional): Maximum number of commits daily. Default: `15`.
- `commit-message` (optional): Commit message for the updates. Default: `Auto-streak update`.

## Example Usage

```yaml
name: Auto-Streak Keeper

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

      - name: Install Dependencies
        run: npm install

      - name: Run Auto-Streak Keeper
        uses: bmiit145/auto-streak-keeper@v1.0.0
        with:
          file-path: "public/auto-streak/data.txt"
          min-commits: 3
          max-commits: 10
          commit-message: "Daily streak maintenance"
```

### **4. Test the Action**
1. **Create a `.github/workflows` folder** in a test repository.
2. Add a workflow YAML file (e.g., `auto-streak.yml`).
3. Push the changes and verify the action.

---

### **5. Publish to GitHub Marketplace**
1. **Create a Release**:
   - Go to the repository’s **Releases** section.
   - Draft a new release with a tag (e.g., `v1.0.0`) and publish it.

2. **Submit to Marketplace**:
   - Go to the repository settings.
   - Under **Actions**, click **Public Actions** and **Submit to GitHub Marketplace**.
   - Provide details and categories for your action.
   - Submit for review.

---

### **6. Improve and Update**
- Add custom features based on user feedback.
- Update the action and publish new versions.

---

This setup ensures that the **Auto-Streak Keeper** action is ready for users to integrate and maintain their GitHub streaks seamlessly. Let me know if you need assistance with any specific step!
