

const fs = require("fs").promises;

const userInputFilePath = "./samples/users.json";

const readFile = async () => {

	try {
		const fileData = await fs.readFile(usersInputFilePath, "utf8");
		
		try {
			const usersFileObj = JSON.parse(fileData);
			//console.log("running");
			return usersFileObj;
		} catch (parseError) {
			const parseErrorOutput = "Error in parsing users.json : " + parseError;
			console.error(parseErrorOutput);
			throw new Error(parseErrorOutput);
		}
	} catch (readError) {
		const readErrorOutput = "Error reading users.json : " + readError;
		console.error(readErrorOutput);
		throw new Error(readErrorOutput);
	}
		
};

const addUser = (users) => {
	
	try {
		fs.writeFile(usersFileInputPath, JSON.stringify(users));
	} catch (writeError) {
		const writeErrorOutput = "Error writing to users.json : " + writeError;
		console.log(writeErrorOutput);
		throw new Error(writeErrorOutput);
	}
};

module.exports = {readFile, addUser};
