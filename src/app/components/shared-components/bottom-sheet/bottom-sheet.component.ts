import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BehaviorSubject } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [CommonModule,MatListModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetComponent {
  private _bottomSheetRef =
  inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);

  samplePostions: string[] = [
    'Senior Software Developer',
    'Product Designer',
    'Flutter Developer',
    'QA Tester',
    'Product Owner'
  ]

  posTrack = (i: number, role: string): string => role;

  selectedPos(event: MouseEvent, role: string): void {
    this._bottomSheetRef.dismiss(role);
    event.preventDefault();
  }
}
