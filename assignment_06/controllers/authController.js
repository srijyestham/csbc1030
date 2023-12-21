const { readFile } = require("../services/fsUsers.js");

const bcrypt = require("bcrypt");

const { generateToken } = require("../services/authService.js");

let usersObj = [];


const loginUser = async (req, res) => {

  try {
    usersObj = await readFile();

    const userEmail = req.body.email;

    const user = usersObj.find((o) => o.email == userEmail);

    if (user != undefined) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).send("Incorrect Password !!!");
      }

      const token = await generateToken(user);

      res.cookie("auth-token", token, { maxAge: 180000, httpOnly: true });

      res.status(200).send({
        message: `User with email ${user.email} Logged IN successfully`,
        token: token,
      });
    } else {
      const loginError = `User with id ${userEmail} is NOT FOUND`;
      console.log(loginError);
      res.status(400).send(loginError);
    }
  } catch (error) {
    res.status(400).send({ Error: error.stack });
  }
};

module.exports = { loginUser };
