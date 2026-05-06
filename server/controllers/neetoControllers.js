const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");
const { default: NeetoJWT } = require("../utils/NeetoJWT");

exports.login = async (req, res) => {
  const { id, productId } = req.params;

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  // TODO: Validate whether productId is valid (neetocal, neetorecord, etc).

  const user = await User.find(id);
  const jwt = new NeetoJWT({ email: user.username }).generate();

  res.redirect(`https://spinkart-jwt.${productId}.net/admin?jwt=${jwt}`);
};
