import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {GLOBAL} from '../../../services/GLOBAL'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public url;
  public usuarios;
  public identity;

  constructor(
    private _userService : UserService,
    private _router : Router,
    
  ) { 
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity.role == 'ADMIN'){
      this._userService.get_users().subscribe(
        response=>{
          this.usuarios = response.usuarios;
        }, error=>{
  
        }
      )
    }else{
      this._router.navigate(['dashboard']);
    }
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
          'El usuario fue eliminado correctamente.',
          'success'
        )
        this._userService.delete_user(id).subscribe(
          response=>{
            this._userService.get_users().subscribe(
              response=>{
                this.usuarios = response.usuarios;
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
          'El usuario no fue eliminado',
          'error'
        )
      }
    })
  }

}
