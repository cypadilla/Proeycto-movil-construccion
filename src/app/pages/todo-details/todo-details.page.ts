import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../models/cliente.interface';
import { TodoService } from '../../services/todo.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  cliente:Cliente = {};
  clienteId = null;
  constructor(private route:ActivatedRoute, private nav:NavController,
    private todoService:TodoService, private loadingController:LoadingController
    ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    if(this.clienteId){
      this.loadTodo();
    }
  }
  async loadTodo(){
    const loading= await this.loadingController.create({
      message:'Loading.....'
    });
    await loading.present();
    this.todoService.getClientesI(this.clienteId).subscribe(res =>{
      loading.dismiss();
      this.cliente=res;
    });
  }

  async saveTodo(){
    const loading= await this.loadingController.create({
      message:'Guardando.....'
    });
    await loading.present();

    if (this.clienteId){

      this.todoService.actualizarCliente(this.cliente).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }else{  
      this.todoService.addClientes(this.cliente).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  onRemove(cliente:Cliente){
    console.log(cliente);
    this.todoService.deleteClientes(cliente);

  }
}
