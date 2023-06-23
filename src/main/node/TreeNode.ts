import {NodeType} from "./NodeType";

export default abstract class TreeNode {

  protected constructor(
    readonly parent: TreeNode | null,
    readonly type: NodeType
  ) {
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  abstract getChildren(): Promise<TreeNode[]>
}
