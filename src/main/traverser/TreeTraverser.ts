import TreeVisitor from "../visitor/TreeVisitor";
import TreeNode from "../node/TreeNode";
import {NodeType} from "../node/NodeType";
import VisitContext from "../visitor/VisitContext";
import {VisitResult} from "../visitor/VisitResult";

export default class TreeTraverser {

  /**
   * @return 반환되는 `VisitResult`는 `traverse()`가 종료된 이유를 나태낸다.
   * 참고로 return값이 `VisitResult.CONTINUE`인 경우 모든 순회를 정상적으로 끝낸 것을 의미한다.
   * @param visitor
   * @param root
   */
  async traverse(visitor: TreeVisitor, root: TreeNode): Promise<VisitResult> {
    return await this.traverseRecur(visitor, root, -1)
  }

  private async traverseRecur(visitor: TreeVisitor, node: TreeNode, depth: number): Promise<VisitResult> {
    try {
      let exitResult = VisitResult.CONTINUE;
      const context = new VisitContext(node, depth);

      if (node.type === NodeType.EXTERNAL) {
        return visitor.visitExternal(context);
      }

      const preResult = visitor.preVisitInternal(context);
      switch (preResult) {
        case VisitResult.SKIP_SUBTREE:
        case VisitResult.TERMINATE:
          return preResult;
        case VisitResult.SKIP_SIBLINGS:
          exitResult = preResult;
          break;
      }

      const children = await node.getChildren();
      const nodes = this.halfSorted(children);

      for (const external of nodes) {
        const recurResult = await this.traverseRecur(visitor, external, depth + 1);
        let br = false
        switch (recurResult) {
          case VisitResult.SKIP_SUBTREE:
            exitResult = recurResult;
            break;
          case VisitResult.SKIP_SIBLINGS:
            exitResult = recurResult;
            br = true;
            break;
          case VisitResult.TERMINATE:
            return recurResult;
        }
        if (br) break;
      }

      const postResult = visitor.postVisitInternal(context);
      switch (postResult) {
        case VisitResult.SKIP_SUBTREE:
        case VisitResult.TERMINATE:
          return postResult;
        case VisitResult.SKIP_SIBLINGS:
          exitResult = postResult;
          break;
      }
      return exitResult;
    } catch (err) {
      const context = new VisitContext(node, depth);
      return visitor.visitFailure(context, err);
    }
  }

  private halfSorted(nodes: TreeNode[]): TreeNode[] {
    const externals: TreeNode[] = [];
    const internals: TreeNode[] = [];

    for (const node of nodes) {
      if (node.type === NodeType.EXTERNAL) {
        externals.push(node);
      } else {
        internals.push(node);
      }
    }

    const result = [];
    externals.forEach(elem => result.push(elem));
    internals.forEach(elem => result.push(elem));

    return result;
  }
}