import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
processing: boolean = false;
editInProcess: boolean = false;
form: FormGroup;
message;
todos;
id;
edit;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
  this.createForm();
 }

 getTodos(){
   this.todoService.getTodos().subscribe( data => {
     this.todos = data.todos;
   });
 }

 goBack(){
   this.processing = false;
   this.editInProcess = false;
 }

  showForm(){
    this.processing = true;
  }

  submitForm(){
    const todo = { todo: this.form.get('todo').value };
    this.todoService.addTodo(todo).subscribe( data => {
      this.message = data.message;
      console.log(this.message);
      this.form.reset();
      this.processing = false;
      this.getTodos();
    })
  }

  editTodo(todo){
    this.edit = todo;
    this.editInProcess = true;
  }

  updateTodo(todo){
    this.todoService.updateTodo(todo).subscribe( data => {
      this.message = data.message;
      console.log(this.message);
      this.editInProcess = false;
      this.getTodos();
    });
  }

  deleteTodo(id){
    this.id = id;
    this.todoService.deleteTodo(this.id).subscribe( data => {
      this.getTodos();
    })
  }

  createForm(){
    this.form = this.formBuilder.group({
      todo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ])]
    });
  };

  ngOnInit() {
    this.getTodos();
  }

}
