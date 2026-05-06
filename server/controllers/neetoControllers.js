const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");
const { default: NeetoJWT } = require("neeto-jwt");

const NEETO_PRODUCTS = {
  neetocal: "https://spinkart.neetocal.net/admin",
  neetorecord: "https://spinkart.neetorecord.net/admin",
};

exports.login = async (req, res) => {
  const { id, productId } = req.params;

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const user = await User.find(req.session.userId);
  const redirectUri = NEETO_PRODUCTS[productId];
  const loginUrl = new NeetoJWT({ email: user.username }).generateLoginUrl(
    redirectUri,
  );

  res.redirect(loginUrl);
};
