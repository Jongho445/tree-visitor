import TreeNode from "./TreeNode";
import {NodeType} from "./NodeType";

export default class ObjectNode extends TreeNode {

  constructor(
    readonly obj: object,
    readonly type: NodeType
  ) {
    super(type);
  }

  getChildren(): Promise<TreeNode[]> {
    const keys = Object.keys(this.obj);
    const children = keys.map(key => {
      const child = this.obj[key];
      const type = typeof child === "object" ? NodeType.INTERNAL : NodeType.EXTERNAL;

      return new ObjectNode(this.obj[key], type)
    });

    return Promise.resolve(children);
  }
}