const { isWhitespace } = require("../src/utils/identities");

describe("identities", () => {
  it("should return true for all trim chars", () => {
    for (let i = 0; i < 65536; i++) {
      let char = String.fromCharCode(i);
      if (!char.trim()) {
        expect(isWhitespace(char)).toBe(true);
      }
    }
  });
});
