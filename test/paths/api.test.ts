import { expect, test } from "bun:test";
import api from "../../src/paths/api.ts";
import { globalOptions } from "../../src/globalOptions.ts";

const baseName = globalOptions.hasName;
const path = api.testRequests();

test("checking path " + baseName + "login", async () => {
  //testing Random User
  expect(
    await path(
      new Request(baseName + "login", {
        method: "POST",
        body: ((form) => (
          form.append("user", "hello"), form.append("pass", "noValid"), form
        ))(new FormData()),
      }),
    )
      .then((res) => res.status),
  ).toStrictEqual(401);

  //injection branch
  expect(
    await api.handleRequest("/login")({
      branch: { getUser: { f: () => ["user", "password"] } },
    })(
      new Request(baseName + "login", {
        method: "POST",
        body: ((form) => (
          form.append("user", "hello"), form.append("pass", "noValid"), form
        ))(new FormData()),
      }),
    )
      .then((res) => res.status),
  ).toStrictEqual(302);

  //testing rigth user
  expect(
    await path(
      new Request(baseName + "login", {
        method: "POST",
        body: ((form) => (
          form.append("user", "jhon"), form.append("pass", "1234"), form
        ))(new FormData()),
      }),
    )
      .then((res) => res.status),
  ).toStrictEqual(302);
});
