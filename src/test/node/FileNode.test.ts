import {it} from "@jest/globals";
import path from "path";
import FileNode from "../../main/node/FileNode";
import {NodeType} from "../../main/node/NodeType";

it("directory", async () => {
  const cur = path.join(__dirname);
  const tDir = path.join(cur, "assets");

  const fNode = new FileNode(tDir, NodeType.INTERNAL);
  const ch = await fNode.getChildren();
  console.log(ch);
});

it("file", async () => {
  const cur = path.join(__dirname);
  const tFile = path.join(cur, "assets", "t2.txt");

  const fNode = new FileNode(tFile, NodeType.EXTERNAL);
  const ch = await fNode.getChildren();
  console.log(ch);
});
