import TreeVisitor from "./TreeVisitor";
import FileNode from "../node/FileNode";
import {VisitResult} from "./VisitResult";
import VisitContext from "./VisitContext";

export default class FileVisitor extends TreeVisitor {

  readonly files: string[] = [];

  constructor(readonly depthLimit: number) {
    super();
  }

  preVisitInternal(context: VisitContext<FileNode>): VisitResult {
    console.log("post: " + context.node.fPath);

    if (context.depth === this.depthLimit) {
      return VisitResult.SKIP_SUBTREE;
    } else {
      return VisitResult.CONTINUE;
    }
  }

  postVisitInternal(context: VisitContext<FileNode>): VisitResult {
    console.log("pre: " + context.node.fPath);
    return VisitResult.CONTINUE;
  }

  visitExternal(context: VisitContext<FileNode>): VisitResult {
    this.files.push(context.node.fPath);
    console.log("file: " + context.node.fPath);
    return VisitResult.CONTINUE;
  }

  visitFailure(context: VisitContext<FileNode>): VisitResult {
    console.log("failure: " + context.node.fPath);
    return VisitResult.CONTINUE;
  }

  visitLimitDepth(context: VisitContext<FileNode>): VisitResult {
    return VisitResult.CONTINUE;
  }
}