import { Injectable } from '@angular/core';
import { NgEntityService, NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { TodosStore, TodosState } from './todos.store';

// @NgEntityServiceConfig({
//   resourceName: 'todos/',
//   baseUrl: 'http://localhost:5000/api',
// })
@Injectable({ providedIn: 'root' })
export class TodosService extends NgEntityService<TodosState> {

  constructor(protected override store: TodosStore) {
    super(store);
  }

}
