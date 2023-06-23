import {it} from "@jest/globals";
import path from "path";
import FileNode from "../../main/node/FileNode";

it("directory", async () => {
  const cur = path.join(__dirname);
  const tDir = path.join(cur, "assets");

  const fNode = FileNode.root(tDir);
  const ch = await fNode.getChildren();
  console.log(ch);
});

it("file", async () => {
  const cur = path.join(__dirname);
  const tFile = path.join(cur, "assets", "t2.txt");

  const fNode = FileNode.root(tFile);
  const ch = await fNode.getChildren();
  console.log(ch);
});
