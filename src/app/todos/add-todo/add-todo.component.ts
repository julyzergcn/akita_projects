import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';

import { Todo, createTodo } from '../../state/todos/todo.model';
import { TodosService } from '../../state/todos/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;
  loaders = this.loader.loadersFor('todos');

  constructor(
    private todosService: TodosService,
    private loader: NgEntityServiceLoader
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    });
  }

  addTodo() {
    let todo = createTodo(this.form.value);
    this.todosService.add(todo).subscribe();
  }

  ngOnInit(): void {
  }

}
