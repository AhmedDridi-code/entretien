import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  todos=[]
  private url = environment.apiUrl + "/todos";
  constructor(private http:HttpClient) { }

  listeTodos():Observable<Todo[]> {
    return this.http.get(this.url) as Observable<Todo[]>;
  }

  deleteTodo(id:number){
    return this.http.get(this.url+`/${id}`);
  }

}
