

const { readFile } = require("../services/users.js");

const bcrypt = require("bcrypt");

const { generateToken } = require("../services/authService.js");

let usersObj = [];

const loginUser = async (req, res) => {
  
	try {
		
		usersObj = await readFile();
		
		const userEmail = req.body.email;

		const user = usersObj.find((u) => u.email == userEmail);
		
		if (user != undefined) {
			const validPassword = await bcrypt.compare(req.body.password, user.password);

			if (!validPassword) {
				return res.status(401).send("Incorrect Password!");
			}

			const token = await generateToken(user);
		  
			res.cookie("auth-token", token, { maxAge: 3600000, httpOnly: true });
		  
			res.status(200).send({
				message: `Logged IN successfully : ${user.email} `,
				token: token,
			});
		  
		} else {
			
			const emailError = `User not found id ${userEmail}`;
			console.log(emailError);
			res.status(400).send(emailError);
		}
		
	} catch (error) {
		res.status(400).send({ Error: error });
	}
};

module.exports = { loginUser };
