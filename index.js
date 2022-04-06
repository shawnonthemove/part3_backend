// 第一版本： 使用node.js的http模块的createServer方法实现web server.
// const http = require("http");
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/json'});
//   response.end(JSON.stringify(notes));
// });
// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// const express = require('express');
// const app = express();
// // 激活 express Json-parser工具
// // Json-parser 的功能是获取请求的 JSON 数据，将其转换为 JavaScript 对象，然后在调用路由处理程序之前将其附加到请求对象的 body 属性。
// app.use(express.json());

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   },
//   {
//     id: 4,
//     content: "Test nodemon",
//     date: "2019-05-30T19:20:14.298Z",
//     important: false
//   }
// ];

// app.get('/', (req, res) => {
//   console.log(req)
//   res.send('<h1>Hello World!</h1>')
// })
// app.get('/api/notes', (req, res) => {
//   res.json(notes)
// })
// app.get('/api/notes/:id', (req, res) => {
//   let id = Number(req.params.id);
//   let note = notes.find(note => note.id === id);
//   if (note === undefined) res.status(404).end();
//   else res.json(note);
// })

// app.delete('/api/notes/:id', (req, res) => {
//   let id = Number(req.params.id);
//   notes = notes.filter(note => note.id !== id);
//   res.status(204).end();
// })

// app.post('/api/notes/', (req, res) => {
//   let note = req.body;
//   if (!note.content) {
//     return res.status(400).json({
//       error: "content missing"
//     })
//   }
//   let maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
//   let newNote = {
//     id : maxID + 1,
//     content: note.content,
//     date: new Date(),
//     important: note.important || false,
//   };
//   notes.push(newNote);
//   res.json(newNote);
// })

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// });

// Phonebook backend
const express = require('express');
const app = express();
const cors = require('cors');
// 激活 express Json-parser工具
// Json-parser 的功能是获取请求的 JSON 数据，将其转换为 JavaScript 对象，然后在调用路由处理程序之前将其附加到请求对象的 body 属性。
app.use(express.json());
app.use(cors());

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
})
app.get('/info', (req, res) => {
  res.send(`<h1>Phonebook has info for ${persons.length} people.</h1> <h1>${new Date()}</h1>`)
})
app.get('/api/persons/:id', (req, res) => {
  let person = persons.find(per => per.id === Number(req.params.id));
  if (person === undefined) res.status(404).end();
  else res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  persons = persons.filter(per => per.id !== id);
  res.status(200).end();
})
app.post('/api/persons', (req, res) => {
  let body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (body.number === undefined) {
    return res.status(400).json({
      error: 'phonenumber missing'
    })
  }
  if (persons.some(per => per.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  let newPerson = {
    id : Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  }
  persons.push(newPerson);
  res.json(newPerson);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});