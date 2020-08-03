import { FormErrorService }  from './../../../../services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject, Component, AfterContentInit } from '@angular/core';

@Component({
    selector:     'app-device-history',
    styleUrls:    ['./history.component.scss'],
    templateUrl:  './history.component.html'
})

export class DeviceHistoryComponent implements AfterContentInit {
    
    constructor(private dialog: MatDialogRef<DeviceHistoryComponent>, @Inject(MAT_DIALOG_DATA) private data: HistoryParams, private formerror: FormErrorService) {}
    
    public form: 		FormGroup 	= new FormGroup({
        'to':  				new FormControl('', [Validators.required]),
        'from': 			new FormControl('', [Validators.required]),
        'datepreselector': 	new FormControl(1, [Validators.required])
    });
    public errors: 		any       	= {
        'to':  	'',
        'from': ''
    };
    public options: 	any[] 		= [
        {
            'value':       1,
            'description': 'Today'
        },
        {
            'value':       2,
            'description': 'Yesterday'
        },
        {
            'value':       3,
            'description': 'Last 7 Days'
        },
        {
            'value':       4,
            'description': 'Current Month'
        },
        {
            'value':       5,
            'description': 'Last Month'
        },
        {
            'value':       6,
            'description': 'Custom Dates'
        }
    ];
    public description: 	string    	= this.data.description;
    public dateSelectExact: boolean;

    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
            'to':  	this.form.value.to,
            'from': this.form.value.from
        });
    };

    private SetDates(value) {
        let to    = new Date();
        let from  = new Date();

        to.setHours(22);
        to.setMinutes(59);
        to.setSeconds(59);
        to.setMilliseconds(999);

        from.setHours(0);
        from.setMinutes(0);
        from.setSeconds(0);
        from.setMilliseconds(0);

        let today = new Date();
        let m     = today.getMonth();
        let y     = today.getFullYear();

        switch(value) {
            case(1):
                to   = new Date();
                from = new Date();

                to.setHours(22);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(999);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);
                break;
            case(2):
                to   = new Date(today.setDate(today.getDate() - 1));
                from = new Date(today.setDate(today.getDate() - 1));

                to.setHours(22);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(999);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);
                break;
            case(3):
                to   = new Date();
                from = new Date();
                from.setDate(new Date().getDate() - 7);

                to.setHours(22);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(999);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);
                break;
            case(4):
                to   = new Date();
                from = new Date();

                to.setHours(22);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(999);
                
                from.setDate(1)
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);
                break;
            case(5):
                to   = new Date(today.getFullYear(), today.getMonth(), 0);
                from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                break;
        };

        this.form.controls['to'].setValue(to);
        this.form.controls['from'].setValue(from);
    };

    ngAfterContentInit() {
    	this.SetDates(1);

    	this.form.controls['datepreselector'].valueChanges.subscribe(value => {
            if (value == 6) { 
                this.dateSelectExact = true;
            } else {
                this.dateSelectExact = false;
                this.SetDates(value);
            };
        });
        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };
}

export interface HistoryParams {
    'description': string;
}