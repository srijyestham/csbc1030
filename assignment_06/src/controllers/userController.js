

const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");

require("dotenv").config();

const jsonWebToken = require("jsonwebtoken");

const { readFile, addUser } = require("../services/users.js");
const { idFromTokenPayload } = require("../services/authService.js");


let usersObj = [];

const getUsers = async (req, res) => {
	
	try {
		
		usersObj = await readFile();
		res.status(200).send(JSON.stringify(usersObj));
		
	} catch (readError) {
		res.status(400).send({ Error: readError });
	}
};

const getUserById = async (req, res) => {
	
	 usersObj = await readFile();
	 
	 const token = await req.cookies["auth-token"];
	 
	 if (!token) {
		res.status(401).send("Access Denied - Token does not exist!");
	}
	 
	try {
		
		let verifiedUser = await jsonWebTokent.verify(token, process.env.TOKEN_SECRET);
		
		if (!verifiedUser) {
			res.status(401).send("Unauthorized request - jwt verification failed");
		}
		
	} catch (error) {
		res.status(400).send("Invalid Token");
		}
		
		
	const userId = req.params.id;
	  
	const user = usersObj.find((u) => u.id == userId);
	  
	if (user != undefined) {
		
		const userIdInToken = idFromTokenPayload(token);

		if (userIdInToken == userId) {
			res.status(200).send(user);
		
		} else {
			res.status(401).send("Unauthorized User with user id " + userIdInToken);
		}
	} else {
		res.status(400).send(`User with id ${userId} is NOT FOUND`);
	}
};

const addNewUser = async (req, res) => {
	
	try {
		
		const salt = await bcrypt.genSalt(10);
		
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		
		const user = {
			
			id: uuidv4(),
			email: req.body.email,
			name: req.body.name,
			password: hashedPassword,
		};
	  
	usersObj.push(user);
	
	addUser(user, usersObj);
	
	res.status(200).send(`User with id ${user.id} added successfully`);
	
	} catch (error) {
		res.status(400).send("Invalid fields for user");
	}
};

module.exports = { getUsers, getUserById, addNewUser };
