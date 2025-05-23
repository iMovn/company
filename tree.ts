const fs = require("fs");
const path = require("path");

const ignoreDirs = [".next", "node_modules", ".git", "public"];

function printTree(dir: string, prefix = "") {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (ignoreDirs.includes(file)) continue;

    const fullPath = path.join(dir, file);
    const isDir = fs.statSync(fullPath).isDirectory();
    console.log(`${prefix}${file}`);

    if (isDir) {
      printTree(fullPath, prefix + "  ");
    }
  }
}

printTree(".");

//Run: bun run tree.ts > tree.txt hoặc npx ts-node tree.ts
