import {NodeType} from "./NodeType";

export default abstract class TreeNode {

  protected constructor(
    readonly type: NodeType
  ) {
  }

  abstract getChildren(): Promise<TreeNode[]>
}
