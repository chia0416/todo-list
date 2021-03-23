const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Todo = require('./models/todo')

const app = express()

//藉由mongoose串接mongodb文件資料庫
mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log("mongobd error!")
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//架設handlebars模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//使用bodyPareser捕捉POST的回傳資料
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//從db讀取資料並渲染index頁面
app.get('/', (req, res) => {
  Todo.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })  //desc 升序及降序
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.log(error));
})

//一個新增頁面
app.get('/todos/new', (req, res) => {
  res.render('new')
})

//從ID比對用戶想取得的名字並進入detail頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.log(error))
})

//從id比對並進入編輯頁面
app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});

//取得用戶想新增的資料，並把資料創建且回傳資料庫裡，然後渲染到idex頁面
app.post('/todos', (req,res) =>{
  const name = req.body.name
  return Todo.create({ name })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

//在用戶指定的id中進入編輯頁面,然後將編輯後的資料取代原有的資料並儲存,然後渲染到index頁面
app.put("/todos/:id", (req, res) => {
  const id = req.params.id
  const { name, isDone }= req.body
  return Todo.findById(id)
    .then( todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) 
    .catch(error => console.log(error))
});

//在用戶指定的id,移除指定的id並渲染index畫面
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then(todo =>  todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})