const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");
const { default: NeetoJWT } = require("neeto-jwt");

const NEETO_PRODUCTS = {
  neetodesk: "https://spinkart.neetodesk.com/consumers/tickets",
};

exports.consumerLogin = async (req, res) => {
  const { id, productId } = req.params;

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const user = await User.find(req.session.userId);
  const redirectUri = NEETO_PRODUCTS[productId];
  const loginUrl = new NeetoJWT({
    email: user.username,
    scope: "consumer",
    workspace: process.env.NEETO_JWT_WORKSPACE
  }).generateLoginUrl(redirectUri);

  res.redirect(loginUrl);
};
