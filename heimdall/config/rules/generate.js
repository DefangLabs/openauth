const fs = require("fs");
const path = require("path");



// Define the input and output file paths
const input_file = path.join(__dirname, "rules.yaml");
const output_file = path.join(__dirname, process.env.ENV+".rules.yaml");

// Check if we have the required environment variables
if (
  !process.env.PUBLIC_ROOT_URL ||
  !process.env.HASURA_DOMAIN ||
  !process.env.FN_DOMAIN ||
  !process.env.NEXTJS_DOMAIN
) {
  console.error(
    "Please set the following environment variables: PUBLIC_ROOT_URL, HASURA_DOMAIN, FN_DOMAIN, NEXTJS_DOMAIN"
  );
  return;
}

// Read the contents of the input file
fs.readFile(input_file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Replace heimdall dev domain with actal domain
  let replaced_content = data.replace(
    new RegExp("http://localhost:5000", "g"),
    process.env.PUBLIC_ROOT_URL
  );
  // Replace hasura dev domain with actual domain
  replaced_content = data.replace(
    new RegExp("hasura:8080", "g"),
    process.env.HASURA_DOMAIN
  );
  // Replace hasura dev domain with actual domain
  replaced_content = data.replace(
    new RegExp("fn:5001", "g"),
    process.env.FN_DOMAIN
  );
  // Replace nextjs dev domain with actual domain
  replaced_content = data.replace(
    new RegExp("host.docker.internal:3000", "g"),
    process.env.NEXTJS_DOMAIN
  );
  // Production Scheme
  replaced_content = data.replace(new RegExp("http", "g"), "https");

  // Write the modified contents to the output file
  fs.writeFile(output_file, replaced_content, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      `Search and replace operation completed. Output written to ${output_file}.`
    );
  });
});
