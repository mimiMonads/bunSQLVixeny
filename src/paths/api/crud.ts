import { wrap } from "vixeny";
import { cryptoKey, globalOptions } from "../../globalOptions.ts";
import { addItem, deleteByID, getFirst10 } from "../../branch/api.ts";
import { getFormDataResolve } from "../../resolve/api.ts";

const path = globalOptions.hasName;

export default wrap({ ...globalOptions, startWith: "/crud" })()
  .customPetition({
    path: "/getAll",
    method: "POST",
    branch: {
      getAll: getFirst10,
    },
    crypto: { ...cryptoKey, token: { jwtToken: {} } },
    f: (c) =>
      c.token.jwtToken &&
        (c.token.jwtToken as ({ iat: number })).iat > Date.now()
        ? new Response(JSON.stringify(c.branch.getAll(null)))
        : new Response(null, {
          status: 401,
        }),
  })
  .customPetition({
    path: "/delete/:id",
    method: "POST",
    branch: {
      deleteByID: deleteByID,
    },
    crypto: { ...cryptoKey, token: { jwtToken: {} } },
    f: (c) =>
      c.token.jwtToken &&
        (c.token.jwtToken as ({ iat: number })).iat > Date.now()
        ? new Response(void c.branch.deleteByID(c.param.id) ?? null)
        : new Response(null, {
          status: 401,
        }),
  })
  .customPetition({
    path: "/create",
    method: "POST",
    resolve: {
      formData: getFormDataResolve,
    },
    branch: {
      createNew: addItem,
    },
    crypto: { ...cryptoKey, token: { jwtToken: {} } },
    f: (c) => {
      const user = c.resolve.formData.get("name") ?? null,
        price = c.resolve.formData.get("price") ?? null;

      if (
        c.token.jwtToken === null ||
        (c.token.jwtToken as ({ iat: number })).iat < Date.now()
      ) {
        return new Response(null, {
          status: 401,
        });
      }

      if (user === null || price === null) {
        return new Response(null, {
          status: 400,
        });
      }

      c.branch.createNew([user, price]);

      return new Response(null, {
        status: 302,
        headers: {
          "Location": path + "api/panel",
        },
      });
    },
  });
