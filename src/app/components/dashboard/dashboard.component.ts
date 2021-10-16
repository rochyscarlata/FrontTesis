import { Component, OnInit } from '@angular/core'; 
import {VentaService} from '../../services/venta.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public identity;
 

 


  constructor(
    private venta_service : VentaService,
  ) {   }

  ngOnInit(): void {
    
  }
 
 

  
  
 
}
