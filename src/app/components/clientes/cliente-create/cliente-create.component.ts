import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente }  from '../../../models/Cliente'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {


  public cliente;
  public identity;

  constructor(
    private _clienteService : ClienteService,
    private _router : Router,
    private _userService : UserService

  ) { 
    this.cliente = new Cliente('', '', '','', 1);
    this.identity = this._userService.getIdentity();

  }

  ngOnInit(): void {
  }


  onSubmit(clienteForm){
    
    if(clienteForm.valid){
      
      this._clienteService.insert_clientes({
        nombres:clienteForm.value.nombres,
        dni:clienteForm.value.dni,
        correo:clienteForm.value.correo,

      }).subscribe(
        response=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente creado con exito',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            this._router.navigate(['clientes']);


          })
          
        }, error=>{

        }
      )
    }
  }
}
