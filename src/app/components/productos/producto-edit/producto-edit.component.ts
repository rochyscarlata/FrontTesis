import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 


@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {


  public producto;
  public id;
  public categorias;
  public url;
  public file: File;
  public imgSelect : String | ArrayBuffer;
  public success_message;
  public error_message;
  public identity;


  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService, 
    private _router : Router,
    private _userService:UserService,


  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();

   }

  ngOnInit(): void {

    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._productoService.get_producto(this.id).subscribe(
        response=>{
          this.producto = response.producto;
          this._productoService.get_categorias().subscribe(
            response=>{
              this.categorias = response.categorias;
              console.log(this.categorias)
            },
            error=>{
      
            }
          )
        },
        error=>{

        }
      )
    })
  }

  success_alert(){
    this.success_message = '';
  }
  error_alert(){
    this.error_message = '';
  }


  imgSelected(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];  

      const reader = new FileReader();
      reader.onload = e => this.imgSelect =reader.result;
      reader.readAsDataURL(this.file);
    }

  }



  onSubmit(productoForm){
    if(productoForm.valid){
      this._productoService.update_producto({
        _id: this.id,
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,
        img_name : this.producto.imagen,
      }).subscribe(
        response=>{
          console.log(response);
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

}
