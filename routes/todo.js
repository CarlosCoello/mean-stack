const Todo = require('../model/todo');
const config = require('../config/database');

module.exports = (router) => {

  router.post('/addTodo', (req,res) => {
    if(!req.body.todo){
      res.json({ success: false, message: 'A todo is required' });
    } else {
      let todo = new Todo({
        todo: req.body.todo.toLowerCase()
      });
      todo.save( (err) => {
        if(err){
          res.json({ success: false, message: 'An error' });
        } else {
          res.json({ success: true, message: 'Todo saved' });
        }
      })
    }
  });

  router.get('/getTodos', (req,res) => {
    Todo.find({}, (err, todos) => {
      if(err){
        res.json({ success: false, message: err });
      } else {
        if(!todos){
          res.json({ success: false, message: 'No Todos found' });
        } else {
          res.json({ success: true, todos: todos });
        }
      }
    }).sort({ '_id': -1 });
  });

  router.delete('/deleteTodo/:id', (req, res) => {
    Todo.findOneAndRemove({ _id: req.params.id }, (err, todo) => {
      if(err){
        res.json({ success: false, message: 'Error happened' });
      } else {
        res.json({ success: true, message: 'Todo has been removed' });
      }
    })
  });

  router.put('/updateTodo', (req, res) => {
    Todo.findOne({ _id: req.body._id }, (err, todo) => {
      if(err){
        res.json({ success: false, message: 'Error happened' });
      } else {
        todo.todo = req.body.todo;
        todo.save( (err) => {
          if(err){
            res.json({ success: false, message: 'Error saving todo' });
          } else {
            res.json({ success: true, message: 'Todo updated' });
          }
        })
      }
    })
  });

  return router;
}
