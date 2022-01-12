import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { AddTodoComponent } from './add-todo/add-todo.component';


@NgModule({
  declarations: [
    TodosComponent,
    AddTodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
