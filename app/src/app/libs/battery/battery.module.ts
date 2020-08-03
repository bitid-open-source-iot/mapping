/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/* --- COMPONENTS --- */

import { BatteryComponent } from './battery.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        BatteryComponent
    ],
    declarations: [
        BatteryComponent
    ]
})

export class BatteryModule {}