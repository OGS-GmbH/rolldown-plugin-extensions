import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { PackageJson } from "type-fest";
import type { Dependencies } from "./internal-types.js";

const packageJsonFileName = "package.json";

function getPackageJson(): PackageJson {
  const cwd = process.cwd();

  const filePath = path.join(cwd, packageJsonFileName);
  const fileContent = fs.readFileSync(filePath, {
    encoding: "utf8"
  });

  return JSON.parse(fileContent) as PackageJson;
}

function getDependencies(packageJson: PackageJson): Dependencies {
  return {
    ...packageJson.peerDependencies,
    ...packageJson.devDependencies,
    ...packageJson.dependencies
  };
}

export { getPackageJson, getDependencies };
