import { Injectable } from '@angular/core';
import {AngularFirestore , AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map }from 'rxjs/operators';
import {Cliente} from '../models/cliente.interface';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  clientesColeccion:AngularFirestoreCollection<Cliente>;
  clienteDoc:AngularFirestoreDocument<Cliente>;
  clientes:Observable<Cliente[]>;

  constructor(public db:AngularFirestore) { 
    this.clientesColeccion = this.db.collection('clientes');
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(map(
      actions => {
      return actions.map(a => {
      const data = a.payload.doc.data() as Cliente;
      data.id = a.payload.doc.id;
      return data;
      })

    }));  
 }

 getClientes(){
  return(this.clientes);
}

getClientesI(id:string){
  return(this.clientesColeccion.doc<Cliente>(id).valueChanges());
}
deleteClientes(cliente: Cliente){
  this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
  return this.clienteDoc.delete();
 }
 addClientes(cliente: Cliente){
  return this.clientesColeccion.add(cliente);
 }
actualizarCliente(cliente:Cliente){
  this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
   return  this.clienteDoc.update(cliente);
}

}
