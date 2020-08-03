import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { OnInit, Component, OnDestroy, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector:       'app-group-select',
    styleUrls:      ['./select.dialog.scss'],
    templateUrl:    './select.dialog.html'
})

export class GroupSelectDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<GroupSelectDialog>, @Inject(MAT_DIALOG_DATA) private config: any, private translate: TranslateService) {};

    public groups:          any         = new MatTableDataSource();
    public columns:         string[]    = ['description'];
    public language:        string      = this.translate.language.value;
    private subscriptions:  any         = {};

    public close() {
        this.dialog.close(false);
    };

    public submit(group) {
        this.dialog.close(group.groupId);
    };

    ngOnInit(): void {
        this.groups.data            = this.config;

        this.subscriptions.language = this.translate.language.subscribe(language => {
            this.language = language;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.language.unsubscribe();
    };

}