import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/cliente/models/cliente';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { DocumentReference } from '@angular/fire/firestore';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  modoInsercao: boolean = true;
  cliente: ClienteViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      casado: false
    })

    if (!this.modoInsercao) {
      this.carregartudo(this.cliente);
    }
  }

  carregartudo(cliente) { //carregar tudo do cliente no modo da edicao as informações do cliente que recebi sejam carregadas automaticamente no formulario
    this.clienteForm.patchValue(cliente);
  }

  /*salvarCliente() {
    if (this.clienteForm.invalid) {
      return;
    }

    let cliente: Cliente = this.clienteForm.value;
    cliente.dataMod = new Date();
    cliente.dataCad = new Date();
    this.clienteService.salvarClientes(cliente)
      .then(response => this.handleSucessSave(response, cliente))
      .catch(err => console.error(err));
  }*/

  salvarCliente() {
    if (this.clienteForm.invalid) {
      return;
    }

    if (this.modoInsercao) {
      let cliente: Cliente = this.clienteForm.value;
      cliente.dataMod = new Date();
      cliente.dataCad = new Date();
      this.clienteService.salvarClientes(cliente)
        .then(response => this.handleSucessSave(response, cliente))
        .catch(err => console.error(err));
    } else {
      let cliente: ClienteViewModel = this.clienteForm.value;
      cliente.id = this.cliente.id;
      cliente.dataMod = new Date();
      this.clienteService.editarClientes(cliente)
      .then(() => this.handleSucessEdit(cliente))
      .catch(err => console.error(err));
    }
  }

  handleSucessSave(response: DocumentReference, cliente: Cliente) {
    this.activeModal.dismiss({ cliente: cliente, id: response.id, modoInsercao: true });
  }

  handleSucessEdit(cliente: ClienteViewModel) {
    this.activeModal.dismiss({ cliente: cliente, id: cliente.id, modoInsercao: false });
  }

}
