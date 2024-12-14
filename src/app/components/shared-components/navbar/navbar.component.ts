import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';
import { IndexeddbService } from '../../../indexDB/indexeddb.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  pageTitle: any;
  private router = inject(Router)
  public commonservice = inject(CommonserviceService)
  private dbService = inject(IndexeddbService)

  ngOnInit() {
    this.commonservice.getTitle().subscribe((resp)=>{
      this.pageTitle=resp
    })
  }

  onDeleteEmployee(): void {
    this.dbService.deleteEmployee(this.commonservice?.editEmployee?.id).subscribe((data)=>{
      this.dbService.setAllEmployees(data)
      this.router.navigate(['/employees']);
      this.commonservice.undoStack.push(this.commonservice?.editEmployee)
      this.commonservice.showSnakBar('Employee data has been deleted')
    })
  }
}
