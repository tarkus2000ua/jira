import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IssueService } from '../issue.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
    filterString = '';

    constructor(private issueService: IssueService, private authService: AuthService) {}

    ngOnInit(): void {}

    onChange(event) {
        this.issueService.filterIssues(event.target.value);
    }

    showMyIssues() {
        this.issueService.filterByAssignee(this.authService.currentUser.displayName);
    }

    resetFilter() {
        this.filterString = '';
        this.issueService.filterIssues('');
    }
}
