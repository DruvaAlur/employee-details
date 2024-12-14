import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
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

  constructor(private router: Router,public commonservice:CommonserviceService,private dbService:IndexeddbService){}

  ngOnInit() {
    this.commonservice.getTitle().subscribe((resp)=>{
      this.pageTitle=resp
    })
  }

  onDeleteEmployee(): void {
    this.dbService.deleteEmployee(this.commonservice.editEmployeeId).subscribe((data)=>{
      this.dbService.setAllEmployees(data)
      this.router.navigate(['/employees']);
    })
  }
}
