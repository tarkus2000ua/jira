import { Issue } from './board/issue.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import app from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private issues: Issue[];
    counter: number;
    issuesChanged = new Subject<Issue[]>();
    filterChanged = new Subject<Issue[]>();

    constructor(public db: AngularFirestore) {}

    saveIssue(issue: Issue) {
        this.db.collection('issues').add(issue);
    }

    getIssues() {
        this.db
            .collection('issues')
            .snapshotChanges()
            .pipe(
                map((docArray) => {
                    return docArray.map((doc) => {
                        return {
                            id: doc.payload.doc.id,
                            type: doc.payload.doc.data()['type'],
                            name: doc.payload.doc.data()['name'],
                            priority: doc.payload.doc.data()['priority'],
                            assignee: doc.payload.doc.data()['assignee'],
                            reporter: doc.payload.doc.data()['reporter'],
                            dueDate: doc.payload.doc.data()['dueDate'],
                            createdAt: doc.payload.doc.data()['createdAt'],
                            updatedAt: doc.payload.doc.data()['updatedAt'],
                            summary: doc.payload.doc.data()['summary'],
                            description: doc.payload.doc.data()['description'],
                            labels: doc.payload.doc.data()['labels'],
                            status: doc.payload.doc.data()['status']
                        };
                    });
                })
            )
            .subscribe((data) => {
                this.issues = data;
                this.issuesChanged.next([...this.issues]);
                this.getCounter();
            });
    }

    filterIssues(value: string) {
        const filteredIssues = Array.from(
            new Set(
                this.issues
                    .filter((item) => item.summary.toLowerCase().includes(value.trim().toLowerCase()))
                    .concat(this.issues.filter((item) => item.name.toLowerCase().includes(value.trim().toLowerCase())))
            )
        );
        this.issuesChanged.next(filteredIssues);
    }

    filterByAssignee(value: string) {
        const filteredIssues = this.issues.filter((item) => item.assignee === value);
        this.issuesChanged.next(filteredIssues);
    }

    getCounter() {
        this.db
            .collection('counters')
            .doc('counter')
            .snapshotChanges()
            .pipe(map((item) => item.payload.data()))
            .subscribe((data) => (this.counter = data['value']));
    }

    incrementCounter() {
        const increment = app.firestore.FieldValue.increment(1);
        this.db.collection('counters').doc('counter').update({ value: increment });
    }
}
