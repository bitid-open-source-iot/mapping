import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from './device';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        DeviceComponent
    ],
    declarations: [
        DeviceComponent
    ]
})

export class DeviceModule {}