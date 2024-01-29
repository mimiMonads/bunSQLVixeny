import { wrap } from "vixeny";
import { globalOptions } from "../globalOptions.ts";

const path = globalOptions.hasName;

export default wrap(globalOptions)()
  .customPetition({
    path: "/",
    f: () =>
      new Response(null, {
        status: 302,
        headers: {
          "Location": path + "public/html/main.html",
        },
      }),
  })
  .stdPetition({
    path: "/ping",
    f: () => "pong",
  });
