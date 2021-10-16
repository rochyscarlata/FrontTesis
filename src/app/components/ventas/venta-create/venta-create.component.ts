import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DetalleVenta } from "../../../models/DetalleVenta";
import { Venta } from "../../../models/Venta";
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';
import { Cliente }  from '../../../models/Cliente'


@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {

  public identity;
  public clientes : any;
  public venta : any = {
    idcliente : '',
  };
  public cliente;
  public productos;
  public producto : any = {
    stock : '--|--',
  }
  public total = 0;

  public data_detalle : Array<any> = [];
  public detalle : any = {
    idproducto : ''
  };
  public error_message;

  constructor(
    private _userService:UserService,
    private _clienteService:ClienteService,
    private _productoService : ProductoService,
    private _router:Router,
    private _ventaService : VentaService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.cliente = new Cliente('', '', '','', 1);

  }

  ngOnInit() {
    if(this.identity){
      this._clienteService.get_clientes().subscribe(
        response=>{
          this.clientes = response.clientes;
        },
        error=>{

        }
      );

      this._productoService.get_productos('').subscribe(
        response =>{
  
          this.productos = response.productos;

        },
        error=>{
          
        }
      );
    }else{
      this._router.navigate(['']);
    }
  }

  get_data_producto(id){
    this._productoService.get_producto(id).subscribe(
      response=>{
        this.producto = response.producto;
      },  
      error=>{

      }
    );
  }

  close_alert(){
    this.error_message = '';
  }

  save_detalle(detalleForm){
    if(detalleForm.valid){
        if(detalleForm.value.cantidad <= this.producto.stock){
          this.data_detalle.push({
            idproducto : detalleForm.value.idproducto,
            cantidad: detalleForm.value.cantidad,
            producto: this.producto.titulo,
            precio_venta : this.producto.precio_venta
          });
  
          this.detalle = new DetalleVenta('','',null);
          this.producto.stock = '--|--',
          

          this.total = this.total + (parseInt(this.producto.precio_venta) * parseInt(detalleForm.value.cantidad));
          console.log( this.total);
          this.producto.precio_venta = ''
        }
        else{
          this.error_message = 'No existe el suficiente stock para la venta';
        }
    }else{
      console.log("error");
    }

  }

  eliminar(idx,precio_venta,cantidad){
    this.data_detalle.splice(idx,1);
    this.total=this.total - (parseInt(precio_venta)*parseInt(cantidad));
  }

// nuevoCliente(clienteForm){
//   if(clienteForm.valid){
//   this._clienteService.insert_clientes({
//     nombres:clienteForm.value.nombres,
//     dni:clienteForm.value.dni,
//     correo:clienteForm.value.correo,

//   }).subscribe(
   
//     )
//   }
   
//   }

  onSubmit(ventaForm){
    if(ventaForm.valid){
      if(ventaForm.value.idcliente != ''){
        let data = {
          idcliente: ventaForm.value.idcliente,
          iduser: this.identity._id,
          detalles: this.data_detalle
        }

        this._ventaService.save_data(data).subscribe(
          response =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Venta realizada con exito!',
              showConfirmButton: false,
              timer: 1500
            })
            this._router.navigate(['ventas']);

          },
          error=>{
            console.log(error);
          }
        );
        
      }else{
        console.log('error');
      }
      
    }else{
      console.log('error');
      
    }
  }
}
