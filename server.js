const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000, DB_HOST: DB_URI } = process.env;

const connection = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Express server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error.");
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
