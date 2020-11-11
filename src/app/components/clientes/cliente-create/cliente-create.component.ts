import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente }  from '../../../models/Cliente'
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {


  public cliente;

  constructor(
    private _clienteService : ClienteService,
    private _router : Router

  ) { 
    this.cliente = new Cliente('', '', '','', 1);
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
          this._router.navigate(['clientes']);
          
        }, error=>{

        }
      )
    }
  }
}
