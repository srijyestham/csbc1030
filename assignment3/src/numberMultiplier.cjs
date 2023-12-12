const fs = require("fs/promises");

const filePath = "../resources/input_numbers.json";
const outputPath = "../resources/output_numbers.json";

function readAndProcessFile(filePath) {
  return fs.readFile(filePath, "utf8")
    .then(data => {
      const inputArray = JSON.parse(data);
      const output = inputArray.map(n => n * 2);
      return output;
    })
    .catch(error => {
      throw new Error(`Error reading  ${filePath} : ${error}`);
    });
}

readAndProcessFile(filePath)
  .then(output => {
    console.log(output);
    return fs.writeFile(outputPath, JSON.stringify(output));
  })
  .then(() => {
    console.log(`Output written to ${outputPath}`);
  })
  .catch(error => {
    console.error(error);
    fs.writeFile(outputPath, JSON.stringify({ error: error.message }))
      .then(() => console.log(`Error output written to ${outputPath}`))
      .catch(err => console.error(`Error writing error output: ${err}`));
  });
