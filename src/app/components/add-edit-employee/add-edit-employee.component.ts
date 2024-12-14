import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../shared-components/bottom-sheet/bottom-sheet.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePickerComponent } from '../shared-components/date-picker/date-picker.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Employee } from '../shared-components/models/Employee';
import { DBConfig, NgxIndexedDBModule, provideIndexedDb } from 'ngx-indexed-db';
import { IndexeddbService } from '../../indexDB/indexeddb.service';
import { Observable } from 'rxjs';
import { CommonserviceService } from '../shared-components/services/commonservice.service';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers:[ ],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent {
  private _bottomSheet = inject(MatBottomSheet);
  private _dialog = inject(MatDialog);
  private  router = inject(Router)
  private _snackBar =  inject(MatSnackBar);
  private dbServices =  inject(IndexeddbService);
  private route = inject(ActivatedRoute)
  private dbService=inject(IndexeddbService)
  private commonService=inject(CommonserviceService)

  employeeName = signal('');
  employeePosition = signal('');
  employee: Partial<Employee> = {};
  fromDate: WritableSignal<string | Date> = signal('');
  toDate: WritableSignal<string | Date> = signal('');
  loader = signal(false);
  formSubmitted = signal(false);
  editMode = signal(false);

  ngOnInit(){
    this.route.data.subscribe((data:any) => {
      if(data['employee']){
        data=data['employee']
        console.log(data);
        this.commonService.setTitle(this.commonService.editEmployeePageTitle)
        this.employee=data
        this.commonService.editEmployeeId=data.id
        this.employeeName.set(data['name'])
        this.employeePosition.set(data['position'])
        this.fromDate.set(data['fromDate'])
        this.toDate.set(data['toDate'])
  
        this.editMode.set(true)
      }else{
        this.commonService.setTitle(this.commonService.addEmployeePageTitle)
      }
    });
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(result => {
      if(result) {
        this.employeePosition.set(result);
      }
    });
  }   


  openDatePicker(event: MouseEvent, dpType: string): void {
    if (this._dialog.openDialogs.length > 0) {
      return;
    }
    const dialogRef = this._dialog.open(DatePickerComponent, {
      disableClose: false,
      width: '450px',
      autoFocus: false,
      data: { type:  dpType, dateObj: {'fromDate': this.fromDate(), 'toDate': this.toDate() } }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result || result === null) {
        if(dpType === 'fromDate') {
          this.fromDate.set(result);
        } else {
          this.toDate.set(result);
        }
      }
    });
  }

  redirectTo(): void {
    this.router.navigate(['/employees']);
  }

  resetEmployeeDetails():void {
    this.employee = {};
    this.employeeName.set('');
    this.employeePosition.set('');
    this.fromDate.set('');
    this.toDate.set('');
  }

  async saveEmployee(): Promise<void> {
    try {
      this.loader.set(true);
      this.formSubmitted.set(true);
      if(this.employeeName() && this.employeePosition() && this.fromDate()) {
        this.employee.name = this.employeeName();
        this.employee.position = this.employeePosition();

        const fromDateUtcFormat = this.fromDate() ? new Date(this.fromDate()).toISOString() : null;
        this.employee.fromDate = fromDateUtcFormat;

        const toDateUtcFormat = this.toDate() ? new Date(this.toDate()).toISOString() : null;
        this.employee.toDate = toDateUtcFormat;
        let observable:Observable<any>;
        if(this.editMode()){
          observable=this.dbServices.updateEmployee(this.employee)
        }else{
          observable=this.dbServices.addEmployee(this.employee)
        }
        observable.subscribe(async (response)=>{
          this.showSnakBar(`Employee ${this.editMode()?'Edited':'Created'} Successfully`);
          await this.resetEmployeeDetails();
          this.redirectTo();
        })
      } else {
        throw new Error("Please fill employee details");
      }
    } catch(error: any) {
      console.log(error.error, typeof(error));
      this.showSnakBar('Please fill employee details');
    } finally {
      this.loader.set(false);
      this.formSubmitted.set(false);
    }
  }

  showSnakBar(message: string) {
    this._snackBar.open(message, 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'multiline-snackbar',
    });
}

}
