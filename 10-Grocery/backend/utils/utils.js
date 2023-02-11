import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          console.error(err);
          res.status(401);
          throw new Error("Not authorized, token failed");
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.status === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
