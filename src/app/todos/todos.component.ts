import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';

import { Todo } from '../state/todos/todo.model';
import { TodosQuery } from '../state/todos/todos.query';
import { TodosService } from '../state/todos/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todosQuery.selectAll();
  isStoreLoading$: Observable<boolean> = this.todosQuery.selectLoading();
  loaders = this.loader.loadersFor('todos');
  error: string = '';

  constructor(
    private todosQuery: TodosQuery,
    private todosService: TodosService,
    private loader: NgEntityServiceLoader
  ) {
  }

  ngOnInit(): void {
    this.todosService.get().subscribe({
      error(err) {
        this.error = err;
      }
    });
  }

  add(todo: Todo) {
    this.todosService.add(todo);
  }

  update(id: ID, todo: Partial<Todo>) {
    this.todosService.update(id, todo);
  }

  delete(id: ID) {
    this.todosService.delete(id);
  }
}
