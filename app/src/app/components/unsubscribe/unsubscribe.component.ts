import { environment } from '../../../environments/environment';
import { FormErrorService }  from '../../services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:     'app-unsubscribe',
    styleUrls:    ['./unsubscribe.component.scss'],
    templateUrl:  './unsubscribe.component.html'
})

export class UnsubscribeComponent implements AfterViewInit {
    
    constructor(private dialog: MatDialogRef<UnsubscribeComponent>, @Inject(MAT_DIALOG_DATA) private data: UnsubscribeParams, private formerror: FormErrorService) {}
    
    public form:          FormGroup = new FormGroup({
        'confirm': new FormControl(false, Validators.required),
    });
    public roles:         any[]     = environment.roles;
    public errors:        any       = {
        'confirm': ''
    };
    public description:   string    = this.data.description;
    public options:       any[]     = [
        {
            'value':       true,
            'description': "Yes, Delete " + this.data.description
        },
        {
            'value':       false,
            'description': "No, Don't Delete " + this.data.description
        }
    ];
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close(this.form.value.confirm);
    };

    ngAfterViewInit() {
        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };
}

export interface UnsubscribeParams {
    'description': string;
}