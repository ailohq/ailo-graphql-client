import { AiloRN, services } from "@ailo/ailorn";

test("AiloRN import", () => {
  expect(AiloRN.of(services.AuthZ.user, "123").getId()).toEqual("123");
});
