import TreeVisitor from "../visitor/TreeVisitor";
import TreeNode from "../node/TreeNode";
import {NodeType} from "../node/NodeType";
import VisitContext from "../visitor/VisitContext";
import {VisitResult} from "../visitor/VisitResult";

export default class TreeTraverser {

  async traverse(visitor: TreeVisitor, root: TreeNode): Promise<void> {
    await this.traverseRecur(visitor, root, -1)
  }

  private async traverseRecur(visitor: TreeVisitor, node: TreeNode, depth: number): Promise<VisitResult> {
    const context = new VisitContext(node, depth);

    if (node.type === NodeType.EXTERNAL) {
      return visitor.visitExternal(context);
    }

    const preResult = visitor.preVisitInternal(context);
    switch (preResult) {
      case VisitResult.SKIP_SUBTREE:
      case VisitResult.TERMINATE:
        return preResult;
    }

    const children = await node.getChildren();
    for (const child of children) {
      const recurResult = await this.traverseRecur(visitor, child, depth + 1);
      let br = false
      switch (recurResult) {
        case VisitResult.SKIP_SIBLINGS:
          br = true;
          break;
        case VisitResult.TERMINATE: return recurResult;
      }
      if (br) break;
    }

    const postResult = visitor.postVisitInternal(context);
    switch (postResult) {
      case VisitResult.SKIP_SUBTREE:
      case VisitResult.TERMINATE:
        return postResult;
    }
  }
}