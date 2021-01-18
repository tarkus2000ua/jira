import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    constructor(private auth: AngularFireAuth, private router: Router) {}

    ngOnInit(): void {}

    logout() {
        this.auth.signOut();
    }

    toDashboard() {
        this.router.navigate(['/system/board']);
    }
}
