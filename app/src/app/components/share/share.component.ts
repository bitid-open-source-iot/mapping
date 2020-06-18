import { environment } from './../../../environments/environment';
import { FormErrorService }  from './../../services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject, Component, AfterContentInit } from '@angular/core';

@Component({
    selector:     'share',
    styleUrls:    ['./share.component.scss'],
    templateUrl:  './share.component.html'
})

export class ShareComponent implements AfterContentInit {
    
    constructor(private dialog: MatDialogRef<ShareComponent>, @Inject(MAT_DIALOG_DATA) private data: ShareParams, private formerror: FormErrorService) {}
    
    public form:          FormGroup = new FormGroup({
        'role':  new FormControl(1, [Validators.required]),
        'email': new FormControl('', [Validators.required, Validators.email])
    });
    public roles:         any[]     = environment.roles;
    public errors:        any       = {
        'role':  '',
        'email': ''
    };
    public description:   string    = this.data.description;
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
            'role':  this.form.value.role,
            'email': this.form.value.email
        });
    };

    ngAfterContentInit() {
        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };
}

export interface ShareParams {
    'description': string;
}