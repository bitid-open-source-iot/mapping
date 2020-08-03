import { TranslateService } from 'src/app/libs/translate/translate.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject, OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-group-editor',
    styleUrls:      ['./editor.dialog.scss'],
    templateUrl:    './editor.dialog.html'
})

export class GroupEditorDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<GroupEditorDialog>, @Inject(MAT_DIALOG_DATA) private config: any, private translate: TranslateService, private formerror: FormErrorService) {};

    public mode:            string      = this.config.mode;
    public form:            FormGroup   = new FormGroup({
        'description':      new FormControl(this.config.description, [Validators.required]),
        'organizationOnly': new FormControl(this.config.organizationOnly, [Validators.required])
    });
    public errors:          any         = {
        'description':      '',
        'organizationOnly': ''
    };
    public language:        string      = this.translate.language.value;
    private subscriptions:  any         = {};

    public close() {
        this.dialog.close(false);
    };

    public submit() {
        this.dialog.close(this.form.value);
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
        
        this.subscriptions.language = this.translate.language.subscribe(language => {
            this.language = language;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.language.unsubscribe();
    };

}