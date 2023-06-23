import TreeNode from "../node/TreeNode";

export default abstract class TreeVisitor {

  abstract postVisitInternal(node: TreeNode)
  abstract preVisitInternal(node: TreeNode)
  abstract visitExternal(node: TreeNode)
  abstract visitFailure(node: TreeNode)
}