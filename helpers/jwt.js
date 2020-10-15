const jwt = require("jsonwebtoken");
const secretKey = "2020";

const tokenGenerator = (users) => {
  console.log(users, "--user");
  const { email, role, id } = users;

  return jwt.sign(
    {
      email,
      role,
      id
    },
    secretKey
  );
};

const tokenVerifier = (access_token) => {
  return jwt.verify(access_token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};