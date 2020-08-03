import { AuthService }  from './../../services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormErrorService }  from './../../services/form-error/form-error.service';
import { Component, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:     'reset-password',
    styleUrls:    ['./reset-password.component.scss'],
    templateUrl:  './reset-password.component.html'
})

export class ResetPasswordComponent implements AfterContentInit {
    
    constructor(private dialog: MatDialogRef<ResetPasswordComponent>, private toast: ToastrService, private service: AuthService, private formerror: FormErrorService) {}
    
    public form: 	FormGroup = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email])
    });
    public errors: 	any       = {
        'email': ''
    };
    public loading: boolean;
    
    public close() {
        this.dialog.close();
    };

    public async submit() {
        this.loading = true;

        const response = await this.service.resetpassword({
            'email': this.form.value.email

        });

        this.loading = false;

        if (response.ok) { 
            this.dialog.close();
            this.toast.success('Your password was reset!', 'Check your mail');
        } else {
            this.toast.error('There was an issue resetting your password! Try again!');
        };
    };

    ngAfterContentInit() {
        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };
}