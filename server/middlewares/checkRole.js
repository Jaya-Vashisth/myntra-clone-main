const checkRole = (role) => {
  return function (req, res, next) {
    const user = req.user;

    if (user && user.role === role) return next();
    else return res.status(403).json({ message: "Forbidden" });
  };
};

export default checkRole;
