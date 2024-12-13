import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IndexeddbService } from '../indexDB/indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverService implements Resolve<any> {

  constructor(private employeeService: IndexeddbService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const employeeId = route.paramMap.get('id'); 
    console.log(employeeId);
    
    if(employeeId){
      return this.employeeService.getEmployeeById(parseInt(employeeId))
    }else{
      return this.employeeService.getAllEmployees();
    }
  }
}
