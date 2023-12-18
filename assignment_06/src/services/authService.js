

const jsonWebToken = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (user) => {
	
	const payload = {
		id: user.id,
		email: user.email,
	};


	const token = jsonWebToken.sign(payload, process.env.TOKEN_SECRET);
	return token;
};

const idFromTokenPayload = (token) => {
 
	const decodedToken = jsonWebToken.decode(token, { complete: true });
	 
	const payload = decodedToken.payload;
	  
	return payload.id;
};
module.exports = { generateToken, idFromTokenPayload };
