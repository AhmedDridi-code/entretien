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
  length?:number;
  id:string=""
  userId:string=""
  title:string=""
  pageEvent?: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  slicedTodos : Todo[]=[]
  pageSizeOptions = [5, 10, 25, 100];
  ngOnInit(): void {
    this.getServerData()
  }

  delteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe(todo => {
      this.slicedTodos = this.slicedTodos.filter(todo => todo.id !== id)
    })
  }

  getServerData(event?:PageEvent){
    console.log("page index: "+event?.pageIndex)
    console.log("page size: "+event?.pageSize)
    console.log("length event: "+event?.length)

    this.pageSize = event?.pageSize || this.pageSize
    this.pageIndex = event?.pageIndex || this.pageIndex;
    let startIndex = this.pageIndex * this.pageSize;
    let endIndex = this.pageIndex * this.pageSize + this.pageSize;
    
    this.todoService.listeTodos().subscribe(todos => {
      if(endIndex>todos.length){
        endIndex = todos.length;
      }
      this.todos=todos;
      this.slicedTodos = this.todos.slice(startIndex,endIndex)
      console.log("length: "+this.todos.length)
    })
  }

}
