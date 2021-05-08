// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
// 引用 Todo model
const Todo = require("../../models/todo");

// 定義首頁路由
//從db讀取資料並渲染index頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({userId})
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })  //desc 升序及降序
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.log(error));
})

// 匯出路由模組
module.exports = router;
