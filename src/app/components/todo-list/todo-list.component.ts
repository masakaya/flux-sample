import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  template: `
    <div class="todo-container">
      <h2>TODO List</h2>

      <div class="add-todo">
        <input
          type="text"
          [(ngModel)]="newTodoTitle"
          placeholder="Add a new task..."
          (keyup.enter)="addTodo()"
        />
        <button (click)="addTodo()">Add</button>
      </div>

      <div class="todos-list">
        <app-todo-item
          *ngFor="let todo of todos"
          [todo]="todo"
          (toggleTodo)="toggleTodo($event)"
          (deleteTodo)="deleteTodo($event)"
        ></app-todo-item>

        <div *ngIf="todos.length === 0" class="empty-state">
          No tasks yet. Add one above!
        </div>
      </div>
    </div>
  `,
  styles: [`
    .todo-container {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background-color: white;
    }

    h2 {
      text-align: center;
      color: #343a40;
      margin-bottom: 20px;
    }

    .add-todo {
      display: flex;
      margin-bottom: 20px;
    }

    .add-todo input {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 4px 0 0 4px;
      font-size: 16px;
    }

    .add-todo button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      font-size: 16px;
    }

    .add-todo button:hover {
      background-color: #0069d9;
    }

    .empty-state {
      text-align: center;
      color: #6c757d;
      padding: 20px;
      font-style: italic;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
