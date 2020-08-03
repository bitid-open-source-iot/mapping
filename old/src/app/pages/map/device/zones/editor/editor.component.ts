import { FormErrorService }  from './../../../../../services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 		'app-device-zone-editor',
	styleUrls: 		['./editor.component.scss'],
	templateUrl: 	'./editor.component.html'
})

export class DeviceZoneEditorComponent implements AfterViewInit {
    
    constructor(private dialog: MatDialogRef<DeviceZoneEditorComponent>, @Inject(MAT_DIALOG_DATA) private data: DeviceZoneEditorParams, private formerror: FormErrorService) {}
    
    public mode: 	string;
    public form: 	FormGroup 	= new FormGroup({
        'zoneId': new FormControl(false, Validators.required),
    });
    public zones: 	any[]		= [];
    public errors:  any     	= {
        'zoneId': ''
    };
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
        	'zoneId': this.form.value.zoneId
        });
    };

    ngAfterViewInit() {
    	this.mode 	= this.data.mode;
    	this.zones 	= this.data.zones;

        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };
}

export interface DeviceZoneEditorParams {
    'mode': 	string;
    'zones': 	any[];
}