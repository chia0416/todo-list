const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default:Date.now //函數本身未回傳值, 意味著我告訴mongoDB,幫我執行這個函數
    //Date.now() 我得到了函數的回傳值,再傳給mongoDB 
  },
});

module.exports = mongoose.model("User", userSchema);
