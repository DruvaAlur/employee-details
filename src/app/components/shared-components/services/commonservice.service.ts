import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  addEmployeePageTitle:string='Add Employee Details'
  editEmployeePageTitle:string='Edit Employee Details'
  displayEmployeePageTitle:string='Employee List'

  editEmployeeId:number=-1

  pageTitle:BehaviorSubject<string>=new BehaviorSubject(this.displayEmployeePageTitle)

  setTitle(title:string){
    this.pageTitle.next(title)
  }

  getTitle(){
    return this.pageTitle
  }

  constructor() { }
}
