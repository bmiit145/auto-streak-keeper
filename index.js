const core = require("@actions/core");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

async function run() {
  try {
    // Inputs
    const filePath = core.getInput("file-path") || "public/auto-streak/data.txt";
    const minCommits = parseInt(core.getInput("min-commits") || 1);
    const maxCommits = parseInt(core.getInput("max-commits") || 15);
    const commitMessage = core.getInput("commit-message") || "Auto-streak update";
    const userName = core.getInput("user-name");
    const userEmail = core.getInput("user-email");
    const githubToken = core.getInput("github-token");
    const branchName = core.getInput("branch-name") || "main";

    // Validate github-token
    if (!githubToken) {
      core.setFailed("GitHub token not found. Please provide a valid token.");
      return;
    }

    // Config file 
    execSync(`git config --global user.name '${userName}'`);
    execSync(`git config --global user.email '${userEmail}'`);
    
    // Check if the branch exists remotely
    try {
      const remoteBranchExists = execSync(
        `git ls-remote --heads origin ${branchName}`
      )
        .toString()
        .trim();
    
      if (remoteBranchExists) {
        console.log(`Branch ${branchName} exists remotely.`);

        // Fetch the branch explicitly from the remote
        execSync(`git fetch origin ${branchName}`);
        // Checkout and set up the branch to track the remote
        execSync(`git checkout ${branchName}`);
      } 
      else {
        console.log(`Branch ${branchName} does not exist remotely. Creating it locally...`);
        // Create and switch to the branch locally
        execSync(`git checkout -b ${branchName}`);
      }
    } catch (error) {
      console.error(`Branch handling failed: ${error.message}`);
      core.setFailed(`Error handling branch ${branchName}: ${error.message}`);
      throw error;
    }


    //Create the file if it doesn't exist
    const fullPath = path.resolve(filePath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, "Auto-streak initialized.\n");
      console.log(`File created at: ${filePath}`);
    }

    // Perform random number of updates (1–15 times)
    const updates = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;
    for (let i = 0; i < updates; i++) {
      const content = `Update #${i + 1} at ${new Date().toISOString()}\n`;
      fs.appendFileSync(fullPath, content);
      console.log(`Updated file: ${filePath} - ${content.trim()}`);

      // Commit each change
      execSync(`git add ${filePath}`);
      execSync(`git commit -m "${commitMessage} - Update ${i + 1}"`);

      // Add random delay between 2 to 5 seconds
      const delay = Math.floor(Math.random() * 5000) + 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Publish the branch
    try {
      execSync(`git push https://${userName}:${githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git ${branchName}`);
      console.log(`All ${updates} updates pushed successfully.`);
    } catch (error) {
      core.setFailed(`Error pushing updates: ${error.message}`);
      throw error;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
