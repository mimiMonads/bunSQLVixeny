import { morphism } from "vixeny";

const getFormDataResolve = morphism()({
  f: async (f) => await f.req.formData(),
});

export { getFormDataResolve };
