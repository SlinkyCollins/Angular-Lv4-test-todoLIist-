import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.css'
})
export class TodoComponentComponent {
  public todoTitle = '';
  public todoDetails = '';
  public todoArray:any[] = [];
  public editTitle = '';
  public editTodoDetails = '';
  public editIndex:number | null = null;

  ngOnInit(){
    let savedTodos = localStorage.getItem('newTodoList');
    if (savedTodos) {
      this.todoArray = JSON.parse(savedTodos);
    }
  }

  createTodo(){
    let todoObj = {
      title: this.todoTitle,
      details: this.todoDetails
    }

    console.log(todoObj);

    this.todoArray.push(todoObj);

    localStorage.setItem('newTodoList', JSON.stringify(this.todoArray));

    console.log(localStorage['newTodoList']);
    
    this.todoTitle = '';
    this.todoDetails = '';
    
  }

  openEditModal(index: number) {
    this.editIndex = index;
    let todo = this.todoArray[index];
    this.editTitle = todo.title;
    this.editTodoDetails = todo.details;
  }

  saveEditTodo() {
    if (this.editIndex !== null) {
      this.todoArray[this.editIndex] = {
        title: this.editTitle,
        details: this.editTodoDetails
      };

      localStorage.setItem('newTodoList', JSON.stringify(this.todoArray));
      
      this.editIndex = null;
      this.editTitle = '';
      this.editTodoDetails = '';
    }
  }
 
  deleteTodo(i:number){
    this.todoArray.splice(i, 1);
    localStorage.setItem('newTodoList', JSON.stringify(this.todoArray));
  }


}
