import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

//domain: string = 'https://quiet-coast-53577.herokuapp.com';


  constructor(private http: Http) { }

  addTodo(todo){
    return this.http.post('/addTodo', todo).map( res => res.json() );
  }

  getTodos(){
    return this.http.get('/getTodos').map( res => res.json() );
  }

  deleteTodo(id){
    return this.http.delete('/deleteTodo/' + id).map( res => res.json() );
  }

  updateTodo(todo){
    return this.http.put('/updateTodo', todo).map( res => res.json() );
  }

}
