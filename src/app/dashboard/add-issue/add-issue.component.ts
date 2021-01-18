import { Router } from '@angular/router';
import { IssueService } from './../issue.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import IssueTypes from '../board/IssueTypes';
import PriorityTypes from '../board/PriorityTypes';
import { Inject } from '@angular/core';
import { Issue } from '../board/issue.model';

@Component({
    selector: 'app-add-issue',
    templateUrl: './add-issue.component.html',
    styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {
    labelsArr = ['FE', 'BE', 'Bug'];
    minDate: Date;
    priorityTypes: any;
    issueTypes: any;
    isAddMode: boolean;
    name = '';
    summary = '';
    description = '';
    type = '';
    priority = '';
    assignee = '';
    dueDate = null;
    labels = [];
    id = '';

    constructor(
        public dialogRef: MatDialogRef<AddIssueComponent>,
        public auth: AuthService,
        private issueService: IssueService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: { id: string; issue: Issue }
    ) {}

    ngOnInit(): void {
        this.minDate = new Date();
        this.priorityTypes = PriorityTypes;
        this.issueTypes = IssueTypes;
        this.issueService.getCounter();
        this.isAddMode = !this.data?.issue;
        if (!this.isAddMode) {
            this.id = this.data.id;
            this.name = this.data.issue.name;
            this.summary = this.data.issue.summary;
            this.description = this.data.issue.description;
            this.type = this.data.issue.type;
            this.priority = this.data.issue.priority;
            this.assignee = this.data.issue.assignee;
            this.dueDate = this.data.issue.dueDate;
            this.labels = this.data.issue.labels;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(form: NgForm) {
        if (this.isAddMode) {
            this.issueService.saveIssue({
                type: form.value.issueType,
                name: 'EPM-' + this.issueService.counter,
                priority: form.value.priority,
                assignee: form.value.assignee,
                reporter: this.auth.currentUser['displayName'],
                dueDate: form.value.dueDate,
                createdAt: new Date(),
                updatedAt: new Date(),
                summary: form.value.summary,
                description: form.value.description,
                labels: form.value.labels,
                status: 'To Do'
            });
            this.issueService.incrementCounter();
            this.router.navigate([`/system/board`]);
        } else {
            this.issueService.db.collection('issues').doc(this.id).update({
                type: form.value.issueType,
                priority: form.value.priority,
                assignee: form.value.assignee,
                dueDate: form.value.dueDate,
                updatedAt: new Date(),
                summary: form.value.summary,
                description: form.value.description,
                labels: form.value.labels
            });
        }
        this.dialogRef.close();
    }
}
