import { NgModule } from '@angular/core';
import { SearchModule } from 'src/app/libs/search/search.module';
import { FilterModule } from 'src/app/pipes/filter/filter.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationsPage } from './notifications.page';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterNotificationsDialog } from './filter/filter.dialog';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        FilterModule,
        CommonModule,
        SearchModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        BottomSheetModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        NotificationsRoutingModule
    ],
    declarations: [
        NotificationsPage,
        FilterNotificationsDialog
    ]
})

export class NotificationsModule {}