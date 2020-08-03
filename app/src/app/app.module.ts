/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthManager } from './services/account/account.manager';
import { ToastService } from './services/toast/toast.service';
import { ZonesService } from './services/zones/zones.service';
import { DevicesService } from './services/devices/devices.service';
import { AccountService } from './services/account/account.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { DataSocketService } from './services/data-socket/data-socket.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { NotificationsService } from './services/notifications/notifications.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENTS --- */
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        AppRoutingModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        SplashscreenModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        ApiService,
        AuthManager,
        ZonesService,
        ToastService,
        DevicesService,
        AccountService,
        FormErrorService,
        DataSocketService,
        LocalstorageService,
        NotificationsService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}