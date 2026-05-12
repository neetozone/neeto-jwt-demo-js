const { default: NeetoJWT } = require("neeto-jwt");
const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");

const NEETO_PRODUCTS = {
  neetodesk: `https://${process.env.NEETO_JWT_WORKSPACE}.neetodesk.com/consumers/tickets`,
};

exports.consumerLogin = async (req, res) => {
  const { id, productId } = req.params;
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const user = await User.find(req.session.userId);
  const redirectUri = NEETO_PRODUCTS[productId];
  const loginUrl = new NeetoJWT({
    email: user.username,
    scope: "consumer",
  }).generateLoginUrl(redirectUri);

  res.redirect(loginUrl);
};
