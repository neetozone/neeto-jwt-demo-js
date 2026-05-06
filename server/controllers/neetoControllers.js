const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");
const { default: NeetoJWT } = require("neeto-jwt");

const NEETO_PRODUCTS = {
  neetocal: "http://spinkart.lvh.me:9000/admin/billing/neetocal/free-members",
  neetorecord:
    "http://spinkart.lvh.me:9000/admin/billing/neetorecord/free-members",
};

exports.login = async (req, res) => {
  const { id, productId } = req.params;

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const user = await User.find(req.session.userId);
  const redirectUri = NEETO_PRODUCTS[productId];
  const loginUrl = new NeetoJWT({ email: user.username })
    .generateLoginUrl
    // redirectUri,
    ();

  res.redirect(loginUrl);
};
