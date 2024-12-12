import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'employees' },
    { path: 'employees', loadComponent: ()=> import('./components/employee-list/employee-list.component').then(
        c => c.EmployeeListComponent
    )},
    { path: 'employee/create', loadComponent: ()=> import('./components/add-edit-employee/add-edit-employee.component').then(
        c => c.AddEditEmployeeComponent
    )},
];
