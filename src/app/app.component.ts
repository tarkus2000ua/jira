import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'jira';
    auth: AngularFireAuth;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.initAuthListener();
        this.auth = this.authService.auth;
    }

}
