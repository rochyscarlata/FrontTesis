import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;
  
  constructor(
    private _userService : UserService,
    private _router: Router
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
  }

  ngOnInit(){
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cierre de sesion exitosa',
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      this._router.navigate(['']);


    })
  }
}
