import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexeddbService } from '../../../indexDB/indexeddb.service';

@Component({
  selector: 'app-employee-row',
  standalone: true,
  imports: [ CommonModule,
      FormsModule,],
  templateUrl: './employee-row.component.html',
  styleUrl: './employee-row.component.scss'
})
export class EmployeeRowComponent {
  startTouchX = 0;
  currentTouchX = 0;
  @Input() employee:any;
  isTouchDevice=signal(true)

  constructor(private router: Router,private route: ActivatedRoute, private dbService:IndexeddbService){}
  ngOnInit() {
    // Detect if the device is a touch device
    this.isTouchDevice.set('ontouchstart' in window || navigator.maxTouchPoints > 0);
    console.log('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
  }

  onTouchStart(event: TouchEvent): void {
    this.isTouchDevice.set(true)
    console.log(true);
    
    this.startTouchX = event.touches[0].clientX;
  }

  istouchedtru(){
    this.isTouchDevice.set(true)
    console.log(true);
    
  }

  onTouchMove(event: TouchEvent,employee:any): void {
    this.currentTouchX = event.touches[0].clientX;
    const deltaX = this.startTouchX - this.currentTouchX;
    
    if (deltaX > 50) {  // Swipe threshold
      employee.swipeLeft = true;
    } else {
      employee.swipeLeft = false;
    }
  }

  onTouchEnd(employee:any): void {
    // Reset or finalize swipe
    if (employee.swipeLeft) {
      // employee.swipeLeft = true;
    }
  }
  onEditDetails(employee:any){
    const {id} = employee;
    this.router.navigate([`employee/${id}/edit`]);
  }
  deleteEmployee(employee:any){
    this.dbService.deleteEmployee(employee.id).subscribe((data)=>{
      this.dbService.setAllEmployees(data)
    })
  }
  onMouseOver() {
    console.log(('ontouchstart' in window || navigator.maxTouchPoints > 0));
    
    this.isTouchDevice.set(('ontouchstart' in window || navigator.maxTouchPoints > 0))
  }
}
