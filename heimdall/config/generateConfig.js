const fs = require("fs");
const path = require("path");



// Define the input and output file paths
const configInputFile = path.join(__dirname, "dev.config.yaml");
const configOutputFile = path.join(__dirname, "config.yaml");

// Check if we have the required environment variables
if (
  !process.env.KRATOS_DOMAIN
) {
  console.error(
    "Please set the following environment variables: KRATOS_DOMAIN"
  );
  return;
}

// Read the contents of the input file
fs.readFile(configInputFile, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Replace heimdall dev domain with actal domain
  let replacedContent = data.replace(
    new RegExp("kratos:4433", "g"),
    process.env.KRATOS_DOMAIN
  );
  
  // Write the modified contents to the output file
  fs.writeFile(configOutputFile, replacedContent, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      `Search and replace operation completed. Output written to ${configOutputFile}.`
    );
  });
});
