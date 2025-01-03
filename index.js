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


    // Config file 
    execSync("git config --global user.name 'github-actions[bot]'");
    execSync("git config --global user.email 'github-actions[bot]@users.noreply.github.com'");
    // Create a new branch named 'auto-streak-keeper'
    execSync("git checkout -b auto-streak-keeper");
    // git pull first
    execSync("git pull origin auto-streak-keeper");


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
    }


    // Publish the branch
    execSync("git push --set-upstream origin auto-streak-keeper");

    console.log(`All ${updates} updates pushed successfully.`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
