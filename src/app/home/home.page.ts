import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { TodoService} from '../services/todo.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  clientes:Cliente[];

  constructor(private todoService:TodoService) {}
  ngOnInit(){
    this.todoService.getClientes().subscribe( res => {
      console.log('Clientes',res)
      this.clientes = res;
    });
  }
}
