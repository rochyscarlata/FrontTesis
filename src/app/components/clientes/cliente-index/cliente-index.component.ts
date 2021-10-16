import { Component, OnInit } from '@angular/core';
import {ClienteService} from 'src/app/services/cliente.service'
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes;
  public identity;

  constructor(
    private _clienteService : ClienteService,
    private _userService : UserService
  ) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this._clienteService.get_clientes().subscribe(
      response=>{
        this.clientes = response.clientes;
      },
      error=>{

      }
    )
  }

  eliminar(id){
    Swal.fire({
      title: 'Esta seguro de eliminarlo?',
      text: "No puede revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El cliente fue eliminado correctamente.',
          'success'
        )
        this._clienteService.delete_cliente(id).subscribe(
          response=>{
            this._clienteService.get_clientes().subscribe(
              response=>{
                this.clientes = response.clientes;
              }, 
              error=>{

              }
            )
          }, error=>{

          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El cliente no fue eliminado',
          'error'
        )
      }
    })
  }

}
