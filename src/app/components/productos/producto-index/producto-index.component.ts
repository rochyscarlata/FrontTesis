import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import {FormsModule, NgForm} from '@angular/forms'
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos;
  public url;
  public filtro;  
  public categorias;
  public titulo_cat;
  public descripcion_cat;


  constructor(
    private _productoService: ProductoService,
  ) {
    this.url = GLOBAL.url
   }

  ngOnInit(): void {
    this._productoService.get_productos('').subscribe(
      response =>{
        this.productos = response.productos;
        console.log(this.productos);
        
      },
      error=>{

      }
    );

      this._productoService.get_categorias().subscribe(
        response=>{
          this.categorias = response.categorias;

        }, 
        error=>{

        }
      )


  }

  search(searchForm){
    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error=>{

      }
    );
    
  }

  save_cat(categoriaForm){
    if(categoriaForm.valid){
     this._productoService.insert_categoria({
       titulo: categoriaForm.value.titulo_cat,
       descripcion: categoriaForm.value.descripcion_cat,
     }).subscribe(
       response=>{
        this._productoService.get_categorias().subscribe(
          response=>{
              this.categorias = response.categorias;
              $('#modal-save-categoria').modal('hide');
          }, error=>{

          }
        )
       },
       error=>{

       }
     )
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
          'El producto fue eliminado correctamente.',
          'success'
        )
        this._productoService.delete_producto(id).subscribe(
          response=>{
            this._productoService.get_productos('').subscribe(
              response=>{
                  this.productos = response.productos;
              },
              error=>{

              }
            );
          },
          error=>{

          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El producto no fue eliminado',
          'error'
        )
      }
    })
  }



}
