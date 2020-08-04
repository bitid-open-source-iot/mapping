import { environment } from 'src/environments/environment';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/pipes/order/order.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/libs/search/search.module';
import { SignalModule } from 'src/app/libs/signal/signal.module';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import { BatteryModule } from 'src/app/libs/battery/battery.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MapRoutingModule } from './map-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- COMPONENTS --- */
import { MapPage } from './map.page';
import { QueryModal } from './query/query.modal';
import { DeviceModal } from './device/device.modal';

@NgModule({
	imports: [
		FormsModule,
		OrderModule,
		CommonModule,
		SearchModule,
		SignalModule,
		MatIconModule,
		BatteryModule,
		MatInputModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatTooltipModule,
		MatToolbarModule,
		MapRoutingModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatButtonToggleModule,
		AgmJsMarkerClustererModule,
		AgmCoreModule.forRoot({
            'apiKey': environment.googleMapsApiKey,
            'libraries': [
                'places',
                'drawing',
                'geometry'
            ]
        })
	],
	declarations: [
		MapPage,
		QueryModal,
		DeviceModal
	]
})

export class MapModule {}