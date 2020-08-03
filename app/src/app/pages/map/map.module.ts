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
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MapRoutingModule } from './map-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

/* --- COMPONENTS --- */
import { MapPage } from './map.page';
import { DeviceModal } from './device/device.modal';

@NgModule({
	imports: [
		OrderModule,
		CommonModule,
		SearchModule,
		SignalModule,
		MatIconModule,
		BatteryModule,
		MatDialogModule,
		MatButtonModule,
		MatTooltipModule,
		MatToolbarModule,
		MapRoutingModule,
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
		DeviceModal
	]
})

export class MapModule {}