import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { Issue } from '../board/issue.model';
import { IssueService } from '../issue.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    id: string;
    issue: Issue = {
        name: '',
        type: 'Issue',
        priority: 'Major',
        assignee: '',
        reporter: '',
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: '',
        description: '',
        labels: [''],
        status: 'To Do'
    };

    constructor(private route: ActivatedRoute, private issueService: IssueService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.issueService.db
            .collection('issues')
            .doc(this.id)
            .snapshotChanges()
            .pipe(map((doc) => doc.payload.data()))
            .subscribe((data) => {
                const item = data;
                this.issue = {
                    ...(item as Issue),
                    dueDate: item['dueDate'].toDate(),
                    createdAt: item['createdAt'].toDate(),
                    updatedAt: item['updatedAt'].toDate()
                };
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddIssueComponent, {
            width: '600px',
            maxHeight: '90vh',
            data: { id: this.id, issue: this.issue }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }

    changeStatus(status: string){
      this.issueService.db.collection('issues').doc(this.id).update({ status: status, updatedAt: new Date() });
    }

  }