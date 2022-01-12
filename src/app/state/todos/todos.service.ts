import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { TodosStore, TodosState } from './todos.store';

@Injectable({ providedIn: 'root' })
export class TodosService extends NgEntityService<TodosState> {

  constructor(protected store: TodosStore) {
    super(store);
  }

}
