import {it} from "@jest/globals";
import path from "path";
import TreeTraverser from "../../main/traverser/TreeTraverser";
import FileVisitor from "../../main/visitor/FileVisitor";
import FileNode from "../../main/node/FileNode";

it("test", async () => {
  const cur = path.join(__dirname);
  const tDir = path.join(cur, "assets");

  const traverser = new TreeTraverser();
  const visitor = new FileVisitor(1);
  const root = FileNode.root(tDir);

  const result = await traverser.traverse(visitor, root);
  console.log(visitor.files);
  console.log(result);
});
