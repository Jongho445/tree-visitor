import {it} from "@jest/globals";
import ObjectNode from "../../main/node/ObjectNode";
import {NodeType} from "../../main/node/NodeType";

it("test", async () => {
  const obj = {
    d1a: "d1a-c",
    d1b: {
      d2a: "d2a-c",
      d2b: "d2b-c"
    },
    d1c: "d1c-c"
  }

  const node = new ObjectNode(obj, NodeType.INTERNAL);
  const children = await node.getChildren();
  console.log(children);
});
