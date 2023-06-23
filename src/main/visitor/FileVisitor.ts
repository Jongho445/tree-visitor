import TreeVisitor from "./TreeVisitor";
import FileNode from "../node/FileNode";

export default class FileVisitor extends TreeVisitor {

  readonly files: string[] = [];

  preVisitInternal(node: FileNode) {
    console.log("pre: " + node.fPath);
  }

  postVisitInternal(node: FileNode) {
    console.log("post: " + node.fPath);
  }

  visitExternal(node: FileNode) {
    this.files.push(node.fPath);
    console.log("file: " + node.fPath);
  }

  visitLimitDepth(node: FileNode) {
    console.log("limit: " + node.fPath);
  }

  visitFailure(node: FileNode) {
    console.log("failure: " + node.fPath);
  }
}