import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoServiceService) { }
  todos:Todo[] = []
  length:number=0
  id:string=""
  userId:string=""
  title:string=""
  pageEvent?: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  ngOnInit(): void {
    this.getServerData()
  }

  delteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe(todo => {
      this.todos = this.todos.filter(todo => todo.id !== id)
    })
  }

  getServerData(event?:PageEvent){
    console.log()
    console.log(event?.pageIndex)
    console.log(event?.pageSize)
    console.log(event?.length)

    this.pageSize = event?.pageSize || this.pageSize
    this.pageIndex = event?.pageIndex || this.pageIndex;
    
    this.todoService.listeTodos().subscribe(todos => {
      length=todos.length;
      console.log(length)
      this.todos = todos.slice(this.pageIndex*this.pageSize,this.pageIndex*this.pageSize+this.pageSize)
    })
  }

}
