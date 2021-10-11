import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from "../../../models/Producto";
import Swal from 'sweetalert2'

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 



@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {


  public producto;
  public file: File;
  public imgSelect : String | ArrayBuffer;
  public categorias;
  public success_message;
  public error_message;

  constructor(
    private _productoService : ProductoService,
    private _router : Router,

  ) { 
    this.producto = new Producto('','','','',1,1,1,'',1)
  }

  ngOnInit(): void {
    this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias = response.categorias
        console.log(this.categorias)
      },
      error=>{

      }
    )
  }

  success_alert(){
    this.success_message = '';
  }
  error_alert(){
    this.error_message = '';
  }

  onSubmit(productoForm){
    if(productoForm.valid){
      this._productoService.insert_producto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,

        
      }).subscribe(
        response =>{
         this.producto = new Producto('','','','',1,1,1,'',1);
         this.imgSelect = '../../../../assets/img/default.jpg';
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto editado con exito',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this._router.navigate(['productos']);


        })
        },
        error=>{
          
        }
      )

    }else{

      this.error_message = 'Complete correctamente el formulario';
    }

  }

  imgSelected(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];  

      const reader = new FileReader();
      reader.onload = e => this.imgSelect =reader.result;
      reader.readAsDataURL(this.file);
    }

  }

}
