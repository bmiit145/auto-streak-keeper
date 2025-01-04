
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

### **How to Use**
1. Add the action to your workflow:
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
2. Push the workflow and let the action take care of maintaining your GitHub streak!

### **Highlights**
- Fully automated workflow for consistent GitHub activity.
- Simple and user-friendly customization options.
- Optimized for streak maintenance enthusiasts.
