// Reads List of Users from a file and exposes two routes


const express = require("express");

const fs = require("fs/promises");

const filePath = "../samples/users.json";

const app = express();

const port = 3000;

let output_data = [];


// read json file
function readAndProcessFile(filePath) {
   return fs.readFile(filePath, "utf8")
    .then(data => {
      const inputArray = JSON.parse(data);
      return inputArray;
    })
    .catch(error => {
      throw new Error(`Error reading  ${filePath} : ${error}`);
    });
}

console.log("Working!");



readAndProcessFile(filePath)
  .then(output => {
	console.log(output);
    output_data = output;
  })

  .catch(error => {
    console.error(error);
  });
  
console.log(output_data);

var routes = express.Router()


// GET all users
app.get("/users", async (req, res) => {
  try {
      res.status(200).send(output_data);
  } catch (error) {
    res.status(400).send("Error in Fetching Users");
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = output_data.find((user) => user.id == userId);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
