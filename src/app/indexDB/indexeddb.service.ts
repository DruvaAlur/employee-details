import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../components/shared-components/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  constructor(private dbService: NgxIndexedDBService) {}

  allEmployees:BehaviorSubject<[]>=new BehaviorSubject([])

  setAllEmployees(employees:any){
    this.allEmployees.next(employees)
  }

  addEmployee(employee: Partial<Employee>): Observable<any> {
    return this.dbService.add('employees', employee);
  }

  getAllEmployees(): Observable<any[]> {
    return this.dbService.getAll('employees');
  }

  getEmployeeById(id: number): Observable<any> {
    return this.dbService.getByKey('employees', id);
  }

  updateEmployee(employee:any): Observable<any> {
    return this.dbService.update('employees', employee);  // The object must have the same ID
  }

  deleteEmployee(id: number): Observable<any> {
    return this.dbService.delete('employees', id);
  }
  
}
