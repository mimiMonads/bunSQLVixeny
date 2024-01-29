import { vixeny, wrap } from "vixeny";
import { globalOptions } from "./src/globalOptions.ts";
import root from "./src/paths/root.ts";
import api from "./src/paths/api.ts";

Bun.serve({
  fetch: vixeny(globalOptions)([
    //importing all the paths
    ...wrap(globalOptions)()
      .union(root.unwrap())
      .union(api.unwrap())
      .unwrap(),
    //adding the static server
    {
      type: "fileServer",
      path: "./public/",
      name: "/public/",
    },
  ]),
  port: 8080,
});
