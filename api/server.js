const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

const app = express();

app.use(cors());
app.use(json());

let todos = [];
let childtodos = [];

app.get('/childtodos', (req, res) => res.send(childtodos));

app.post('/childtodos', (req, res) => {
	const childtodo = { title: req.body.title, id: nanoid(), cDate:req.body.cDate , pId : req.body.pId };
	childtodos.push(childtodo);
	return res.send(childtodo);
});

app.patch('/childtodos/:id', (req, res) => {
	
	const id = req.params.id;
	const index = childtodos.findIndex((todo) => todo.id == id);
	
	if (index > -1) {
		childtodos[index].title = req.body.title;
	}
	return res.send(childtodos[index]);
});
app.delete('/childtodos/:id', (req, res) => {
	const id = req.params.id;
	const index = childtodos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		childtodos.splice(index, 1);
	}

	res.send(childtodos);
});
app.patch('/childtodosToggle/:id', (req, res) => {
	
	const id = req.params.id;
	const index = childtodos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		childtodos[index].completed = Boolean(req.body.completed);
	}
	return res.send(childtodos[index]);
});


app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid()};
	todos.push(todo);
	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		todos[index].title = req.body.title;
	}
	return res.send(todos[index]);
});
app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		todos.splice(index, 1);
	}

	res.send(todos);
});

const PORT = 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
