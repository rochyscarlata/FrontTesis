import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {


  public id;
  public total = 0;

  public venta: any = {
    iduser: '',
    idcliente: ''
  };
  public detalle_venta;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
    private _userService :UserService,
    private _router : Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(){

      if(this.identity){
        this._route.params.subscribe(params=>{
          this.id = params['id'];
          this._ventaService.data_venta(this.id).subscribe(
            response=>{
              this.venta = response.data.venta;
              this.detalle_venta = response.data.detalles;
              for(let i = 0; i < response.data.detalles.length; i++ ){
                this.total += response.data.detalles[i].cantidad*response.data.detalles[i].idproducto.precio_venta;
              };
              
              console.log(response.data)
            },
            error=>{
    
            }
          );
        })
      }else{
        this._router.navigate(['']);
      }
   


  }

}
