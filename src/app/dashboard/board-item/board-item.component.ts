import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../board/issue.model';
import issueTypes from '../board/IssueTypes';
import priorityTypes from '../board/PriorityTypes';

@Component({
    selector: 'app-board-item',
    templateUrl: './board-item.component.html',
    styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
    @Input() issue: Issue;
    issueIcon;
    priorityIcon;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.issueIcon = issueTypes.find((item) => item.type === this.issue.type)['icon'];
        this.priorityIcon = priorityTypes.find((item) => item.type === this.issue.priority)['icon'];
    }

    onViewItem(item) {
        console.log(item);
        this.router.navigate([`/system/issue/${item.id}`]);
    }
}
