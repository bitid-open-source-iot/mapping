/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/* --- COMPONENTS --- */
import { SignalComponent } from './signal.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	exports: [
		SignalComponent
	],
	declarations: [
		SignalComponent
	]
})

export class SignalModule {}