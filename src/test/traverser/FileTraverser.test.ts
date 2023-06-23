import {it} from "@jest/globals";
import path from "path";
import TreeTraverser from "../../main/traverser/TreeTraverser";
import FileVisitor from "../../main/visitor/FileVisitor";
import FileNode from "../../main/node/FileNode";
import {NodeType} from "../../main/node/NodeType";

it("test", async () => {
  const cur = path.join(__dirname);
  const tDir = path.join(cur, "assets");

  const traverser = new TreeTraverser();
  const visitor = new FileVisitor();
  const root = new FileNode(tDir, NodeType.INTERNAL);

  // await traverser.traverse(visitor, root, 100);
  await traverser.traverse(visitor, root, 1);
  console.log(visitor.files);
});
