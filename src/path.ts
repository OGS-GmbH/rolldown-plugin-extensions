import fs from "node:fs";
import type { Dependencies } from "./internal-types.js";

const relativeCurrentMarker = "./";
const relativeUpperMarker = "../";
const absoluteMarker = "/";

function isProjectFile(path: string): boolean {
  return (
    path.startsWith(relativeCurrentMarker) ||
    path.startsWith(relativeUpperMarker) ||
    path.startsWith(absoluteMarker)
  );
}

function isDependency(dependencies: Dependencies, path: string): boolean {
  const pathArr = path.split(absoluteMarker);

  return Object.keys(dependencies).some((dependencyName) => {
    const dependencyNameArr = dependencyName.split(absoluteMarker);
    return dependencyName === pathArr.slice(0, dependencyNameArr.length).join(absoluteMarker);
  });
}

function isDirectory(path: string): boolean {
  return fs.statSync(path).isDirectory();
}

function isFile(path: string): boolean {
  return fs.statSync(path).isFile();
}

export { isProjectFile, isDependency, isDirectory, isFile };
