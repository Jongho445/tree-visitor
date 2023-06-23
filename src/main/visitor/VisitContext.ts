import TreeNode from "../node/TreeNode";

export default class VisitContext<T extends TreeNode> {

  constructor(
    readonly node: T,
    readonly depth: number
  ) {
  }
}