import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject, OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-filter-notifications',
    styleUrls:      ['./filter.dialog.scss'],
    templateUrl:    './filter.dialog.html'
})

export class FilterNotificationsDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<FilterNotificationsDialog>, @Inject(MAT_DIALOG_DATA) private data: FilterProperties, private formerror: FormErrorService) {};

    public form:            FormGroup   = new FormGroup({
        'sort':		new FormControl(this.data.sort.key),
        'limit':	new FormControl(this.data.limit, [Validators.required, Validators.min(1), Validators.max(1000)]),
        'reverse':	new FormControl(this.data.sort.reverse)
    });
    public sort:            any[]       = [
        {
            'value': 'date',
            'title': 'Date'
        },
        {
            'value': 'title',
            'title': 'Title'
        },
        {
            'value': 'message',
            'title': 'Message'
        }
    ];
    public errors:          any         = {
        'sort':     '',
        'limit':    '',
        'reverse':  '',
        'systemId': ''
    };
    public status:          any[]       = [];
    public systems:         any[]       = [];
    public loading:         boolean;
    private subscriptions:  any         = {};

    public close() {
        this.dialog.close(false);
    };

    public submit() {
        this.dialog.close({
            'sort': {
                'key':      this.form.value.sort,
                'reverse':  this.form.value.reverse
            },
            'limit':    this.form.value.limit
        });
    };
    
    public reverse(event: MouseEvent) {
        event.stopPropagation();
        this.form.controls['reverse'].setValue(!this.form.value.reverse);
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}

interface FilterProperties {
    'sort': {
        'key':      string;
        'reverse':  boolean;
    };
    'limit': number;
}