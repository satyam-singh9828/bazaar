import jwt from "jsonwebtoken";

// Check if user is authenticated
export const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;


  // Check Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user data to request object
    req.userId = decoded.userId;
    req.userType = decoded.userType;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};

// Seller-only access
export const isSeller = (req, res, next) => {
  if (req.userType !== "seller") {
    return res.status(403).json({
      message: "Access denied. Only sellers are allowed",
    });
  }
  next();
};

// Buyer-only access
export const isBuyer = (req, res, next) => {
  if (req.userType !== "buyer") {
    return res.status(403).json({
      message: "Access denied. Only buyers are allowed",
    });
  }
  next();
};

