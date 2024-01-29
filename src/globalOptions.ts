import { assertOptions } from "vixeny";

const globalOptions = {
  hasName: "http://localhost:8080/",
};

const cryptoKey = {
  globalKey: "hello" || crypto.randomUUID(),
};

assertOptions(globalOptions);
export { cryptoKey, globalOptions };
