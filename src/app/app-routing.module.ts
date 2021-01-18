import { BoardComponent } from './dashboard/board/board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueComponent } from './dashboard/issue/issue.component';

const dashboardRoutes: Routes = [
    {
        path: 'board',
        component: BoardComponent
    },
    {
        path: 'issue/:id',
        component: IssueComponent
    }
];

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'system',
        component: DashboardComponent,
        children: dashboardRoutes
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
