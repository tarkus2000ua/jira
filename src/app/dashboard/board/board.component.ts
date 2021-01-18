import { IssueService } from './../issue.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from './board.model';
import { Subscription } from 'rxjs';
import { Issue } from './issue.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    issuesSubscription: Subscription;
    issues: Issue[] = [];
    todo: Issue[] = [];
    progress: Issue[] = [];
    done: Issue[] = [];

    constructor(public issueService: IssueService) {}

    ngOnInit(): void {
        this.issuesSubscription = this.issueService.issuesChanged.subscribe((issues) => {
            this.issues = issues;
            this.todo = issues.filter((el) => el.status === 'To Do');
            this.progress = issues.filter((el) => el.status === 'In Progress');
            this.done = issues.filter((el) => el.status === 'Done');
            this.board.columns = [
                { name: 'To do', id: 'todo', issues: this.todo },
                { name: 'In progress', id: 'progress', issues: this.progress },
                { name: 'Done', id: 'done', issues: this.done }
            ];
        });
        this.issueService.getIssues();
    }

    public board: Board = {
        name: 'Issues',
        columns: [
            { name: 'To do', id: 'todo', issues: this.todo },
            { name: 'In progress', id: 'progress', issues: this.progress },
            { name: 'Done', id: 'done', issues: this.done }
        ]
    };

    public dropGrid(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            const docId = event.container.data[event.currentIndex]['id'];
            let newStatus: string;
            switch (event.container.id) {
                case 'todo':
                    newStatus = 'To Do';
                    break;
                case 'progress':
                    newStatus = 'In Progress';
                    break;
                case 'done':
                    newStatus = 'Done';
                    break;
                default:
                    break;
            }
            this.issueService.db.collection('issues').doc(docId).update({ status: newStatus, updatedAt: new Date() });
        }
    }
}
