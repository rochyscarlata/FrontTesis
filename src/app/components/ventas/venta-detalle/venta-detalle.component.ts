import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css'],
})
export class VentaDetalleComponent implements OnInit {
  public id;
  public total = 0;

  public venta: any = {
    iduser: '',
    idcliente: '',
  };
  public detalle_venta;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if (this.identity) {
      this._route.params.subscribe((params) => {
        this.id = params['id'];
        this._ventaService.data_venta(this.id).subscribe(
          (response) => {
            this.venta = response.data.venta;
            this.detalle_venta = response.data.detalles;
            for (let i = 0; i < response.data.detalles.length; i++) {
              this.total +=
                response.data.detalles[i].cantidad *
                response.data.detalles[i].idproducto.precio_venta;
            }

            console.log(response.data);
          },
          (error) => {}
        );
      });
    } else {
      this._router.navigate(['']);
    }

  }
  public downloadPDF(): void {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('DetalleVenta.pdf');
    });
  }
}
