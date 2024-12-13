import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexeddbService } from '../../indexDB/indexeddb.service';
import { EmployeeRowComponent } from "../shared-components/employee-row/employee-row.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatCardModule, CommonModule,
    FormsModule, EmployeeRowComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {

  constructor(private router: Router,private route: ActivatedRoute, private dbService:IndexeddbService){}

  employee=signal([])
  // isSwipedLeft = false;
  startTouchX = 0;
  currentTouchX = 0;
  currentEmployees:Signal<any> = computed(() =>
    this.employee().filter(
      (employee:any) => employee.fromDate && !employee.toDate
    )
  );

  previousEmployees:Signal<any> = computed(() =>
    this.employee().filter((employee:any) => employee.fromDate && employee.toDate)
  );

  onAddEmployee(): void {
    this.router.navigate(['employee/create']);
  }

  ngOnInit(){
    this.route.data.subscribe((data) => {
      this.dbService.setAllEmployees(data['employee'])
    });
    this.dbService.allEmployees.subscribe((data:any)=>{
      data=data.map((employee: any) => ({
        ...employee,       
        swipeLeft: false   
      }))
      this.employee.set(data);
    })
  }



  

  deleteItem(): void {
    alert('Item deleted!');
    // Implement your delete functionality here
  }

}
