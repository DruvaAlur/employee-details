import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexeddbService } from '../../../indexDB/indexeddb.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonserviceService } from '../services/commonservice.service';
@Component({
  selector: 'app-employee-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-row.component.html',
  styleUrl: './employee-row.component.scss',
})
export class EmployeeRowComponent {
  startTouchX = 0;
  currentTouchX = 0;
  @Input() employee: any;
  isTouchDevice = signal(true);

  private router=inject(Router)
  private dbService=inject(IndexeddbService)
  public commonservice = inject(CommonserviceService)

  ngOnInit() {
    this.isTouchDevice.set(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }

  onTouchStart(event: TouchEvent): void {
    this.isTouchDevice.set(true);
    this.startTouchX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent, employee: any): void {
    this.currentTouchX = event.touches[0].clientX;
    const deltaX = this.startTouchX - this.currentTouchX;

    if (deltaX > 50) {
      employee.swipeLeft = true;
    } else {
      employee.swipeLeft = false;
    }
  }
  onEditDetails(employee: any) {
    const { id } = employee;
    this.router.navigate([`employee/${id}/edit`]);
  }
  deleteEmployee(employee: any) {
    this.dbService.deleteEmployee(employee.id).subscribe((data) => {
      this.commonservice.undoStack.push(employee)
      this.dbService.setAllEmployees(data);
      this.commonservice.showSnakBar('Employee data has been deleted')
    });
  }
  onMouseOver() {
    this.isTouchDevice.set(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }
}
