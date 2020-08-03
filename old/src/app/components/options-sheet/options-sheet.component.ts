import { Inject, Component } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
    selector: 'app-options-sheet',
    templateUrl: './options-sheet.component.html',
    styleUrls: ['./options-sheet.component.scss']
})

export class OptionsSheetComponent {
    
    constructor(private sheet: MatBottomSheetRef<OptionsSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {};

    public items       = this.data.items;
    public description = this.data.description;

    public select(item): void {
        this.sheet.dismiss(item.option);
    };
}