const bcrypt = require("bcryptjs");

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hashPass,
  comparePass
};
