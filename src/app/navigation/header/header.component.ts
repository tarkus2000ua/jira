import { Subscription } from 'rxjs';
import { AddIssueComponent } from './../../dashboard/add-issue/add-issue.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user;
    userSubscription = new Subscription();

    constructor(public auth: AngularFireAuth, public dialog: MatDialog, private authService: AuthService) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.userChanged.subscribe((user) => {
            this.user = user;
        });
    }

    logout() {
        this.auth.signOut();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddIssueComponent, {
            width: '600px',
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }
}
