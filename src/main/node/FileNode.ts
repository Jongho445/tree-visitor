import TreeNode from "./TreeNode";
import {NodeType} from "./NodeType";
import path from "path";
import fs from "fs/promises";

export default class FileNode extends TreeNode {

  constructor(readonly fPath: string, readonly type: NodeType) {
    super(type);
  }

  async getChildren(): Promise<TreeNode[]> {
    const stat = await fs.stat(this.fPath);
    if (stat.isFile()) {
      return Promise.resolve([]);
    }

    const fNames = await fs.readdir(this.fPath);
    const fPaths = fNames.map(fName => path.join(this.fPath, fName));

    const ps = fPaths.map(path => fs
        .stat(path)
        .then(stat => ({ path, stat }))
    );
    const fInfos = await Promise.all(ps);

    return fInfos.map(info => {
      const type = info.stat.isDirectory() ? NodeType.INTERNAL : NodeType.EXTERNAL;
      return new FileNode(info.path, type);
    });
  }
}