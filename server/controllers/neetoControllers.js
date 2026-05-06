const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");
const { default: NeetoJWT } = require("neeto-jwt");

exports.login = async (req, res) => {
  const { id, productId } = req.params;

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const user = await User.find(req.session.userId);
  const loginUrl = new NeetoJWT({ email: user.username }).generateLoginUrl(
    productId,
  );
  console.log(loginUrl);

  res.redirect(loginUrl);
};
