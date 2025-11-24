import { Routes } from '@angular/router';
 import { TaskListComponent } from './Component/task-list/task-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasksList', pathMatch: 'full' },
    { path: 'tasksList', component: TaskListComponent }, 
];
