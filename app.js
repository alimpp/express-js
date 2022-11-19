const express = require('express')
const users = require('./users')
const app = express()
const { body, validationResult } = require('express-validator')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json())

app.use(express.json())

app.get('/', (req, res) => {
   res.send("Hello Express Js")
})

app.get('/api/users', (req, res) => {
   res.json({ data: users, message: "ok" })
})

app.get('/api/user/:id', (req, res) => {
   const user = users.find(u => u.id == req.params.id)
   res.json(user)
})

app.post('/api/user/create', [
   body('name', 'name must be empty').notEmpty(),
   body('email', 'email has error').isEmail(),
], (req, res) => {
   const errors = validationResult(req.body)
   if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, errors: errors.array(), message: 'validation errors' })
   }
   users.push({ id: users.length + 1, ...req.body })
   res.json({
      data: users,
      message: "ok",
   })
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
   if (err) console.log(err);
   console.log(`${port} conection`);
})


