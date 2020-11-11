import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {GLOBAL} from '../../../services/GLOBAL'

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

}
