import TreeNode from "./TreeNode";
import {NodeType} from "./NodeType";

export default class ObjectNode extends TreeNode {

  constructor(
    readonly parent: ObjectNode | null,
    readonly obj: object,
    readonly type: NodeType
  ) {
    super(parent, type);
  }

  static root(obj: object): ObjectNode {
    return new ObjectNode(null, obj, NodeType.INTERNAL);
  }

  getChildren(): Promise<TreeNode[]> {
    const keys = Object.keys(this.obj);
    const children = keys.map(key => {
      const child = this.obj[key];
      const type = typeof child === "object" ? NodeType.INTERNAL : NodeType.EXTERNAL;

      return new ObjectNode(this, this.obj[key], type)
    });

    return Promise.resolve(children);
  }
}