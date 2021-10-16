import { Component, OnInit } from '@angular/core'; 
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'; 
import {VentaService} from '../../services/venta.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels'; 
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public identity;
  public ventas;
  public total: any[] = []; 
  public factura: any[] = [];
  public detalle: any[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(
    private venta_service : VentaService,
  ) {   }

  ngOnInit(): void {
     this.venta_service.get_ventas().subscribe(response => {
       this.barChartData = response;
     });
     this.get_Facturas();
     this.get_detalles();
  }

  public get_Facturas(){

    setTimeout(() => {
      this.venta_service.get_ventas().subscribe(response => {
        for(let i = 0; i < response.ventas.length ; i++){
          this.factura[i] = response.ventas[i]._id ;
          
        }
        console.log(this.factura); 
      });
    }, 2000)
    
      
      console.log('hola toggled')
      
    
    
   
   
  }

  
  public get_detalles(){
    for(let i = 0; i < this.factura.length; i++){
      this.venta_service.data_venta(this.factura[i]._id).subscribe(respuesta => {
        for(let i = 0; i < respuesta.length ; i++){
          this.total[i] = respuesta.data.detalles[i].cantidad*respuesta.data.detalles[i].idproducto.precio_venta;
        }
        
        console.log(this.total)

      })
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }
}
