import { Component, OnInit } from '@angular/core';

import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';
import { NOMEM } from 'dns';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private clienteService: ClienteService,
  ) { }

  clientes: ClienteViewModel[] = [] //variavel que vai armazenar os campos de ClienteViewModel

  ngOnInit() {
    this.mostrarClientes();
  }


  addCliente() {
    const modal = this.modalService.open(ClienteFormComponent); //meu servico vai estar abrindo/inicializando a classe clienteformComponent
    modal.result.then(
      this.handleModalClientForm.bind(this), // quando minha modal for fechada vai executar
      this.handleModalClientForm.bind(this)
    )
  }

  EditarClick(cliente: ClienteViewModel) {
    const modal = this.modalService.open(ClienteFormComponent); //meu servico vai estar abrindo/inicializando a classe clienteformComponent
    modal.result.then(
      this.handleModalClientForm.bind(this), // quando minha modal for fechada vai executar
      this.handleModalClientForm.bind(this)
    )
    modal.componentInstance.modoInsercao = false;
    modal.componentInstance.cliente = cliente;
  }



  mostrarClientes() {
    this.clienteService.getClientes().subscribe(response => {
      this.clientes = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const cliente: ClienteViewModel = {
          id: id,
          nome: data.nome,
          endereco: data.endereco,
          casado: data.casado,
          dataMod: data.dataMod.toDate()
        };
        this.clientes.push(cliente); // variavel clientes add dados de cliente ( que é os campos ClienteViewModel)
      });
    });
  }

  checkedCasado(index: number) {
    const novoValor = !this.clientes[index].casado
    this.clientes[index].casado = novoValor;

    const obj = { casado: novoValor };
    const id = this.clientes[index].id
    this.clienteService.editarClientesParcial(id, obj);
  }

  DeletarClick(clienteId: string , index:number) {
    this.clienteService.deletarClientes(clienteId)
    .then(() => {this.clientes.splice(index, 1); }) // não só remover além disso deletar do banco
    .catch(err => console.error(err));
  }

  handleModalClientForm(response) {
    if (response === Object(response)) {
      if (response.modoInsercao) {
        response.cliente.id = response.id;
        this.clientes.unshift(response.cliente);
      }
      else {
        let index = this.clientes.findIndex(value => value.id == response.id)
        this.clientes[index] = response.cliente;
      }
    }
  }



}
