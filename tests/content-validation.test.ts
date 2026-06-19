import { describe, expect, it } from "vitest";
import { validateSeedContent } from "@/lib/content-validation";

describe("content validation", () => {
  it("accepts the bundled sourced learning and activity data", () => {
    expect(validateSeedContent()).toEqual({
      learningItemCount: 115,
      activityItemCount: 15
    });
  });
});
