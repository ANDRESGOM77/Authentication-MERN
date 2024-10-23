import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - no valid token" });

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error in protectRoute", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error ProtectRoute" });
  }
};
