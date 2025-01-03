
### **What's New**
Auto-Streak Keeper is a GitHub Action designed to help maintain your GitHub streak by automating file creation, updates, and commits on a daily schedule. This initial release includes:

- **Daily Updates**: Automatically create or update a file (`data.txt`) with new content.
- **Customizable Inputs**:
  - `file-path`: Specify the file to update (default: `public/auto-streak/data.txt`).
  - `min-commits` and `max-commits`: Set a range for the number of daily commits.
  - `commit-message`: Customize the commit message.
- **Automatic Branch Management**:
  - Creates and pushes updates to a dedicated branch (`auto-streak-keeper`).
  - Validates and pulls the branch if it already exists remotely.
- **GitHub Streak Maintenance**: Ensures daily activity to maintain your streak with minimal effort.

### **How to Use**
1. Add the action to your workflow:
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
2. Push the workflow and let the action take care of maintaining your GitHub streak!

### **Highlights**
- Fully automated workflow for consistent GitHub activity.
- Simple and user-friendly customization options.
- Optimized for streak maintenance enthusiasts.
