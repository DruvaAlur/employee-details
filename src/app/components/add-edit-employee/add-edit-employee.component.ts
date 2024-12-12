import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../shared-components/bottom-sheet/bottom-sheet.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePickerComponent } from '../shared-components/date-picker/date-picker.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [MatBottomSheetModule,MatFormFieldModule,MatDialogModule,CommonModule,
    FormsModule,MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent {
  private _bottomSheet = inject(MatBottomSheet);
  private _dialog = inject(MatDialog);
  private  router = inject(Router)
  private _snackBar =  inject(MatSnackBar);

  employeeName = signal('');
  employeePosition = signal('');
  fromDate: WritableSignal<string | Date> = signal('');
  toDate: WritableSignal<string | Date> = signal('');
  loader = signal(false);
  formSubmitted = signal(false);

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(result => {
      if(result) {
        // this.employeePosition.set(result);
      }
    });
  }   

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.employeeName.set(input.value);
  }

  openDatePicker(event: MouseEvent, dpType: string): void {
    if (this._dialog.openDialogs.length > 0) {
      return;
    }
    const dialogRef = this._dialog.open(DatePickerComponent, {
      disableClose: false,
      // height: '450px',
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

  async saveEmployee(): Promise<void> {}

  showSnakBar(message: string) {
    this._snackBar.open(message, 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'multiline-snackbar',
    });
}

}
