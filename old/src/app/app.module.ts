/* ENVIRONMENT */
import { environment } from './../environments/environment'

/* PAGES */
import { MapComponent } from './pages/map/map.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

/* MODULES */
import {
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from '@bitid/account';
import { TranslateModule } from '@bitid/translate';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LocaTrackingSettingsModule } from '@loca-tracking/settings';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* SERVICES */
import { ApiService } from './services/api/api.service';
import { MenuService } from './services/menu/menu.service';
import { AuthService } from './services/auth/auth.service';
import { AuthManager } from './services/auth/auth.manager';
import { ZonesService } from './services/zones/zones.service';
import { DevicesService } from './services/devices/devices.service';
import { DrawingService } from './services/drawing/drawing.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { DataSocketService } from './services/data-socket/data-socket.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { NotificationsService } from './services/notifications/notifications.service';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { ZoneComponent } from './pages/map/zone/zone.component';
import { ShareComponent } from './components/share/share.component';
import { RemoveComponent } from './components/remove/remove.component';
import { DeviceComponent } from './pages/map/device/device.component';
import { SearchComponent } from './components/search/search.component';
import { TableViewComponent } from './pages/map/history-mode/table-view/table-view.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DeviceZonesComponent } from './pages/map/device/zones/zones.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { DrawingModeComponent } from './pages/map/drawing-mode/drawing-mode.component';
import { HistoryModeComponent } from './pages/map/history-mode/history-mode.component';
import { OptionsSheetComponent } from './components/options-sheet/options-sheet.component';
import { DeviceHistoryComponent } from './pages/map/device/history/history.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DeviceZoneEditorComponent } from './pages/map/device/zones/editor/editor.component';
import { SectionSeporatorComponent } from './components/section-seporator/section-seporator.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        MapComponent,
        AppComponent,
        HomeComponent,
        HelpComponent,
        ZoneComponent,
        LoginComponent,
        ShareComponent,
        RemoveComponent,
        DeviceComponent,
        SearchComponent,
        NotFoundComponent,
        TableViewComponent,
        FileUploadComponent,
        DeviceZonesComponent,
        DrawingModeComponent,
        SubscribersComponent,
        UnsubscribeComponent,
        HistoryModeComponent,
        OptionsSheetComponent,
        PrivacyPolicyComponent,
        NotificationsComponent,
        ResetPasswordComponent,
        DeviceHistoryComponent,
        SectionSeporatorComponent,
        DeviceZoneEditorComponent,
    ],
    imports: [
        FormsModule,
        OrderModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        BrowserModule,
        MatTableModule,
        MatInputModule,
        MatChipsModule,
        MatRippleModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule,
        MatSidenavModule,
        AppRoutingModule,
        MatTooltipModule,
        MatToolbarModule,
        HttpClientModule,
        FlexLayoutModule,
        MatGridListModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatBottomSheetModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        ToastrModule.forRoot(),
        AccountModule.forRoot({
            'auth':         environment.auth,
            'clientIdAuth': environment.appId
        }),
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        LocaTrackingSettingsModule,
        AgmJsMarkerClustererModule,
        AgmCoreModule.forRoot({
            'apiKey': environment.googleMapsApiKey,
            'libraries': [
                'places',
                'drawing',
                'geometry'
            ]
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        ApiService,
        MenuService,
        AuthService,
        AuthManager,
        ZonesService,
        DevicesService,
        DrawingService,
        FormErrorService,
        DataSocketService,
        LocalstorageService,
        NotificationsService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ZoneComponent,
        ShareComponent,
        RemoveComponent,
        DeviceComponent,
        SearchComponent,
        TableViewComponent,
        FileUploadComponent,
        HistoryModeComponent,
        DeviceZonesComponent,
        SubscribersComponent,
        UnsubscribeComponent,
        DrawingModeComponent,
        OptionsSheetComponent,
        DeviceHistoryComponent,
        ResetPasswordComponent,
        DeviceZoneEditorComponent
    ]
})

export class AppModule {}