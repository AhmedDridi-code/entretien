import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: Todo[], ...args: string[]): Todo[] {
    const userId = args[0];
    const id = args[1];
    const title = args[2];
    var todos = value
    if(userId) {
      todos = todos.filter(el=> String(el.userId) === userId)
    }
    if(id){
      todos = todos.filter(el=> String(el.id) === id)
    }
    if(title){
      todos = todos.filter(el=> el.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase()))
    }
    return todos;
  }

}
