import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import User from './user.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    public users = [];
    currentUser;
    userChanged = new Subject<User>();

    constructor(private router: Router, public auth: AngularFireAuth, private db: AngularFirestore) {
        this.auth.user.subscribe((user) => {});
    }

    initAuthListener() {
        this.auth.authState.subscribe((user) => {
            if (user) {
                this.isAuthenticated = true;
                this.db
                    .collection('users')
                    .get()
                    .subscribe((data) => {
                        const uidArr = data.docs.map((doc) => doc.data()['uid']);
                        if (uidArr.findIndex((el) => el === user['uid']) === -1) {
                            const newUser = {
                                uid: user['uid'],
                                displayName: user['displayName']
                            };
                            this.db.collection('users').add(newUser);
                        }
                    });
                this.getUsers();

                if (user.displayName) {
                    this.currentUser = { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL };
                    this.userChanged.next(this.currentUser);
                    console.log('user changed at media');
                } else {
                    this.db
                        .collection('users')
                        .ref.where('uid', '==', user.uid)
                        .get()
                        .then((doc) => {
                            this.currentUser = {
                                uid: doc.docs[0].data()['uid'],
                                displayName: doc.docs[0].data()['displayName'],
                                photoURL: `https://eu.ui-avatars.com/api/?background=random&name=${doc.docs[0].data()['displayName']}`
                            };
                            this.userChanged.next(this.currentUser);
                        });
                }

                this.router.navigate(['/system/board']);
            } else {
                this.isAuthenticated = false;
                this.router.navigate(['/login']);
            }
        });
    }

    login(authData: AuthData) {
        console.log('login');
        this.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                // console.log(result);
            })
            .catch((err) => console.log(err));
    }

    loginWithFacebook() {
        this.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((result) => {
                // console.log(result);
            })
            .catch((err) => console.log(err));
    }

    loginWithGoogle() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
        this.currentUser = null;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    getUsers() {
        this.db
            .collection('users')
            .get()
            .subscribe((data) => {
                this.users = data.docs.map((doc) => doc.data());
            });
    }
}
