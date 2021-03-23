const mongoose = require("mongoose");

//藉由mongoose串接mongodb文件資料庫
mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongobd error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

module.exports = db