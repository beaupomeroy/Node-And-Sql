require("dotenv").config();
// Import the jsonwebtoken package to handle JWT operations
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

// Export an object containing the isAuthenticated middleware function
module.exports = {
	isAuthenticated: (req, res, next) => {
		// Retrieve the 'Authorization' header from the incoming request
		const headerToken = req.get("Authorization");

		if (!headerToken) {
			console.log("ERROR IN auth middleware");
			res.sendStatus(401);
		}

		let token;

		try {
			// Verify the token using the SECRET key
			token = jwt.verify(headerToken, SECRET);
		} catch (err) {
			err.statusCode = 500;
			throw err;
		}

		if (!token) {
			const error = new Error("Not authenticated.");
			error.statusCode = 401;
			throw error;
		}
		// If the token is verified successfully, proceed to the next middleware or route handler
		next();
	},
};
