import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id;
  public cliente: any = {}
  public success_message;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _router: Router,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();

    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        this._clienteService.get_cliente(this.id).subscribe(
          response => {
            console.log(response);
            this.cliente = response.cliente;
          }
        )
      }
    )
  }

  close_alert() {
    this.success_message = '';
  }

  onSubmit(clienteForm) {
    if (clienteForm.valid) {
      this._clienteService.update_cliente({
        _id: this.id,
        nombres: clienteForm.value.nombres,
        correo: clienteForm.value.correo,
        dni: clienteForm.value.dni

      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente editado con exito',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            this._router.navigate(['clientes']);


          })

        }

      )
    }
  }
}
