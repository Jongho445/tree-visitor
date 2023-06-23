import TreeNode from "../node/TreeNode";

export default abstract class TreeVisitor {

  abstract preVisitInternal(node: TreeNode)
  abstract postVisitInternal(node: TreeNode)
  abstract visitExternal(node: TreeNode)

  /**
   * limit depth에서의 node는 항상 internal node이다
   * (이는 limit depth 여부 보다 external 여부를 먼저 체크하기 때문이다.
   * TreeTraverser 코드를 참고하라)
   * @param node
   */
  abstract visitLimitDepth(node: TreeNode)
  abstract visitFailure(node: TreeNode)
}