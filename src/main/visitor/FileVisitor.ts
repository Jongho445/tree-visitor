import TreeVisitor from "./TreeVisitor";
import FileNode from "../node/FileNode";

export default class FileVisitor extends TreeVisitor {

  postVisitInternal(node: FileNode) {
    console.log(node);
  }

  preVisitInternal(node: FileNode) {
    console.log(node);
  }

  visitExternal(node: FileNode) {
    console.log(node);
  }

  visitFailure(node: FileNode) {
    console.log(node);
  }
}