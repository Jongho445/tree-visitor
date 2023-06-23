import TreeVisitor from "../visitor/TreeVisitor";
import TreeNode from "../node/TreeNode";
import {NodeType} from "../node/NodeType";

export default class TreeTraverser {

  async traverse(visitor: TreeVisitor, root: TreeNode, depthLimit: number) {
    await this.traverseRecur(visitor, root, -1, depthLimit)
  }

  private async traverseRecur(visitor: TreeVisitor, node: TreeNode, depth: number, depthLimit: number) {
    if (node.type === NodeType.EXTERNAL) {
      return visitor.visitExternal(node);
    }

    if (depth === depthLimit) {
      return visitor.visitLimitDepth(node);
    }

    visitor.preVisitInternal(node);

    const children = await node.getChildren();
    for (const child of children) {
      await this.traverseRecur(visitor, child, depth + 1, depthLimit);
    }

    visitor.postVisitInternal(node);
  }
}