const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const extractToken = (req) => {
  if (req.cookies && req.cookies.token) {
    return { token: req.cookies.token, source: 'cookie' };
  }
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    return { token: header.slice(7), source: 'header' };
  }
  return { token: null, source: null };
};

const protect = async (req, res, next) => {
  const { token, source } = extractToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // CSRF defense (in addition to the CORS origin allowlist).
  // A cookie is an ambient credential the browser attaches to cross-site
  // requests automatically, so a state-changing request authenticated purely
  // by the cookie must also carry a custom header that only our own
  // XHR/fetch client can set. A cross-site <form> submission cannot set
  // custom headers, so it is rejected even though the auth cookie rides along.
  // Bearer-token requests are exempt: an attacker cannot read the token to
  // replay it, so they are not a CSRF vector.
  if (
    source === 'cookie' &&
    !SAFE_METHODS.has(req.method) &&
    req.get('X-Requested-With') !== 'XMLHttpRequest'
  ) {
    return res.status(403).json({ message: 'CSRF validation failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });
    // Always resolve the user from the DB so a demoted account or a token
    // that has been revoked (tokenVersion bumped) cannot keep access with an
    // old but still-unexpired token.
    const user = await User.findById(decoded.id).select('role tokenVersion');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    if ((user.tokenVersion || 0) !== (decoded.tokenVersion || 0)) {
      return res.status(401).json({ message: 'Not authorized, token revoked' });
    }
    req.user = { id: String(user._id), role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// protect has already resolved req.user.role from the DB, so this is a cheap
// in-memory check with no extra query.
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  next();
};

module.exports = { protect, requireAdmin };
