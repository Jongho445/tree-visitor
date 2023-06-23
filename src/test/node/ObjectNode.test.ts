import {it} from "@jest/globals";
import ObjectNode from "../../main/node/ObjectNode";

it("test", async () => {
  const obj = {
    d1a: "d1a-c",
    d1b: {
      d2a: "d2a-c",
      d2b: "d2b-c"
    },
    d1c: "d1c-c"
  }

  const root = ObjectNode.root(obj);
  const children = await root.getChildren();
  console.log(children);
});
