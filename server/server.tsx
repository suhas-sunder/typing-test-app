const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const appFile = require("./app.tsx");


const port = process.env.PORT || 3000;

appFile.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
