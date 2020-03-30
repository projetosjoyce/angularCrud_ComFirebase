import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteViewModel } from '../models/cliente-view-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFirestore) { }

  private clienteColection = 'clientes';

  getClientes(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Cliente>(this.clienteColection, ref => ref.orderBy('nome', 'asc')).get();
  }

  salvarClientes(cliente: Cliente): Promise<DocumentReference> { //cliente é a interface
    return this.db.collection(this.clienteColection).add(cliente);
  }

  editarClientes(cliente: ClienteViewModel): Promise<void> { //ClienteViewModel é a interface
    return this.db.collection(this.clienteColection).doc(cliente.id).update(cliente); //doc edicacao espera id
  }

  editarClientesParcial(id: string, obj: Object): Promise<void> { //ClienteViewModel é a interface
    return this.db.collection(this.clienteColection).doc(id).update(obj); //doc edicacao espera id
  }

  deletarClientes(id: string): Promise<void> { //ClienteViewModel é a interface
    return this.db.collection(this.clienteColection).doc(id).delete(); //doc edicacao espera id
  }


}
