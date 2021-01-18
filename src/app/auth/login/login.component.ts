import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private authService: AuthService, public iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/Google__G__Logo.svg'));
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', { validators: [Validators.required] })
        });
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm?.value.email,
            password: this.loginForm?.value.password
        });
    }

    loginWithFacebook() {
        this.authService.loginWithFacebook();
    }

    loginWithGoogle() {
        this.authService.loginWithGoogle();
    }
}
