import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/User'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public user;
  public success_message;
  public identity;


  constructor(
    private _userService : UserService,
    private _router : Router,

  ) { 
    this.user = new User('', '', '','', '');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity.role == 'ADMIN'){

    }else{
      this._router.navigate(['dashboard']);
    }
  }

  success_alert(){
    this.success_message = '';
  }

  onSubmit(userForm){
    if(userForm.valid){
      this._userService.registrar({
        password: userForm.value.password,
        nombres: userForm.value.nombres,
        email: userForm.value.email,
        role: userForm.value.role,


      }).subscribe(
        response=>{
          this.user = new User('', '', '','', '');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado con exito',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            this._router.navigate(['usuarios']);


          })
        },error=>{
          console.log(<any>error);
        }
        
      )
    }
  }
}
