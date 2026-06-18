import { describe, expect, it } from "vitest";
import { createOpaqueToken, hashPassword, hashToken, verifyPassword } from "../../worker/src/security";

describe("worker security helpers", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("correct horse battery staple");
    await expect(verifyPassword("correct horse battery staple", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong password", hash)).resolves.toBe(false);
  });

  it("creates opaque tokens and hashes them deterministically", async () => {
    const token = createOpaqueToken();
    expect(token).toContain(".");
    await expect(hashToken(token)).resolves.toEqual(await hashToken(token));
  });
});
