const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//一個新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//取得用戶想新增的資料，並把資料創建且回傳資料庫裡，然後渲染到idex頁面
router.post('/', (req,res) =>{
  const todos = String(req.body.name).split(',').map(todo => ({name: todo}));
  Todo.insertMany(todos)
  .then(() =>{
    return res.redirect('/')
  })
})
//   const name = req.body.name
//   return Todo.create({ name })
//   .then(() => res.redirect('/'))
//   .catch(error => console.log(error))
// })

//從ID比對用戶想取得的名字並進入detail頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.log(error))
})

//從id比對並進入編輯頁面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});

//在用戶指定的id中進入編輯頁面,然後將編輯後的資料取代原有的資料並儲存,然後渲染到index頁面
router.put("/:id", (req, res) => {
  const id = req.params.id
  console.log('edit')
  const { name, isDone }= req.body
  return Todo.findById(id)
    .then( todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/`)) 
    .catch(error => console.log(error))
});

//在用戶指定的id,移除指定的id並渲染index畫面
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then(todo =>  todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

module.exports = router