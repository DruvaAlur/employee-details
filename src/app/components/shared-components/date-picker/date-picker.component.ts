import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule,MatDialogModule,CommonModule,MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  private _dialogRef = inject<MatDialogRef<DatePickerComponent>>(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  selectedDate = model<Date | null>(null);

  pickerType: string = '';
  minDate: Date | null = null;
  toDate: Date | null = null;

  constructor() {}

  ngOnInit(): void {
    const {type, dateObj} = this.data;
    this.minDate = dateObj?.fromDate;
    this.pickerType = type;

    if(this.pickerType === 'fromDate' && dateObj.fromDate) {
      this.selectedDate.set(dateObj.fromDate);
    }
    if(this.pickerType === 'toDate' && dateObj.toDate) {
      this.selectedDate.set(dateObj.toDate);
    }
  }

  isFromDateSelected() {
    if(this.pickerType === 'toDate') return this.minDate;
    return null;
  }

  setToday() {
    this.selectedDate.set(new Date());
  }

  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    this.selectedDate.set(nextMonday);
  }

  setNextTuesday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilNextTuesday = (2 - dayOfWeek + 7) % 7 || 7;
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);
    this.selectedDate.set(nextTuesday);
  }

  setAfterOneWeek() {
    const today = new Date();
    const afterOneWeek = new Date(today);
    afterOneWeek.setDate(today.getDate() + 7);
    this.selectedDate.set(afterOneWeek);
  }

  clearDate() {
    this.selectedDate.set(null);
    this.saveDate();
  }

  saveDate() {
    this._dialogRef.close(this.selectedDate());
  }
} 
