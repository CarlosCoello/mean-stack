const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: { type: String, required: true },
  dateCreated: { type:Date, default: Date.now() }
});

module.exports = mongoose.model('Todo', todoSchema);
