const { hashPassword, comparePassword } = require("./utils/hash");

(async () => {
  const password = "hello123";

  const hashed = await hashPassword(password);
  console.log("Hashed:", hashed);

  const match = await comparePassword(password, hashed);
  console.log("Password matches:", match);
})();
