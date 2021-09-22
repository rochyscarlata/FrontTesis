import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public id;
  public user;  
  public success_message;
  public password;
  public identity;

  constructor(
    private _route : ActivatedRoute,
    private _userService : UserService,
    private _router : Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(){
    if(this.identity.role == 'ADMIN'){
      this._route.params.subscribe(params=>{
        this.id = params['id'];
  
        this._userService.get_user(this.id).subscribe(
          response=>{
            this.user = response.user;
          }, error=>{
  
          }
        )
      })
    }else{
      this._router.navigate(['dashboard']);

    }
  }
  onSubmit(userForm){
    if(userForm.valid){
      this._userService.editar({
        _id: this.id,
        nombres: userForm.value.nombres,
        email: userForm.value.email,
        password: userForm.value.password,
        role: userForm.value.role,
      }
      ).subscribe(
        response=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente editado con exito',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            this._router.navigate(['usuarios']);


          })

        }
      )
    }
  }
}
