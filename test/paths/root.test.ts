import { expect, test } from "bun:test";
import root from "../../src/paths/root";
import { globalOptions } from "../../src/globalOptions";

const baseName = globalOptions.hasName;
const path = root.testRequests();

test("can check if using Bun", async () => {
  //base root
  expect(
    await path(new Request(baseName))
      .then((res) => res.status),
  ).toStrictEqual(302);
  // ping pong test
  expect(
    await path(new Request(baseName + "ping"))
      .then((res) => res.text()),
  ).toStrictEqual("pong");
});
