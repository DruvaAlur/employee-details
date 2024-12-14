import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { IndexeddbService } from '../../../indexDB/indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  private _snackBar = inject(MatSnackBar);
  private dbService = inject(IndexeddbService)
  addEmployeePageTitle:string='Add Employee Details'
  editEmployeePageTitle:string='Edit Employee Details'
  displayEmployeePageTitle:string='Employee List'
  undoStack:any[]=[]
  editEmployee:any={}

  pageTitle:BehaviorSubject<string>=new BehaviorSubject(this.displayEmployeePageTitle)

  setTitle(title:string){
    this.pageTitle.next(title)
  }

  getTitle(){
    return this.pageTitle
  }

  getAllEmployees(){
    this.dbService.getAllEmployees().subscribe((response:any)=>{
      this.dbService.setAllEmployees(response)
    })
  }

  showSnakBar(message: string) {
    let sanckbar = this._snackBar.open(message, 'undo', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'multiline-snackbar',
    })
    sanckbar.onAction().subscribe(()=>{
      this.dbService.addEmployee(this.undoStack.pop()).subscribe((response:any)=>{
        this.getAllEmployees()
      })
    })
  }
}
