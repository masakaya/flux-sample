import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <input
        type="checkbox"
        [checked]="todo.completed"
        (change)="toggleTodo.emit(todo.id)"
      />
      <span class="todo-title">{{ todo.title }}</span>
      <button class="delete-btn" (click)="deleteTodo.emit(todo.id)">Delete</button>
    </div>
  `,
  styles: [`
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 5px;
      border-radius: 4px;
      background-color: #f8f9fa;
    }

    .completed {
      text-decoration: line-through;
      color: #6c757d;
      background-color: #e9ecef;
    }

    .todo-title {
      margin-left: 10px;
      flex-grow: 1;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    }

    .delete-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleTodo = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
}
