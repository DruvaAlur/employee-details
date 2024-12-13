import { Routes } from '@angular/router';
import { EmployeeResolverService } from './resolver/employee-resolver.service';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'employees' },
    { path: 'employees', loadComponent: ()=> import('./components/employee-list/employee-list.component').then(
        c => c.EmployeeListComponent
    ),resolve: {
        employee: EmployeeResolverService,  // Use the resolver to pre-fetch the employee data
      }},
    { path: 'employee/create', loadComponent: ()=> import('./components/add-edit-employee/add-edit-employee.component').then(
        c => c.AddEditEmployeeComponent
    )},
    { path: 'employee/:id/edit', loadComponent: ()=> import('./components/add-edit-employee/add-edit-employee.component').then(
        c => c.AddEditEmployeeComponent
    ),resolve: {
        employee: EmployeeResolverService,  // Use the resolver to pre-fetch the employee data
      }},
];
