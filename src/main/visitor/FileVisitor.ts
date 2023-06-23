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
    const fPath = context.node.fPath;
    console.log("pre: " + fPath);

    // const fName = this.getFilename(fPath);
    // if (fName === "d0da") {
    //   throw Error("hello~");
    // }

    if (context.depth === this.depthLimit) {
      return VisitResult.SKIP_SUBTREE;
    } else {
      return VisitResult.CONTINUE;
    }
  }

  postVisitInternal(context: VisitContext<FileNode>): VisitResult {
    console.log("post: " + context.node.fPath);
    return VisitResult.CONTINUE;
  }

  visitExternal(context: VisitContext<FileNode>): VisitResult {
    const fPath = context.node.fPath;
    console.log("file: " + fPath);
    this.files.push(fPath);

    const fName = this.getFilename(fPath);
    if (fName === "d0fb.txt") {
      // return VisitResult.TERMINATE;
      // return VisitResult.SKIP_SIBLINGS
    }

    return VisitResult.CONTINUE;
  }

  visitFailure(context: VisitContext<FileNode>, err: any): VisitResult {
    console.log("failure: " + context.node.fPath);
    console.log("errorMessage: " + err)
    return VisitResult.CONTINUE;
  }

  private getFilename(fPath: string): string {
    const match = fPath.match(/.*\\(.*)/);
    return match[1];
  }
}