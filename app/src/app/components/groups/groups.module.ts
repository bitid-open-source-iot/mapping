import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from 'src/app/libs/translate/translate.module';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GroupSelectDialog } from './select/select.dialog';
import { GroupEditorDialog } from './editor/editor.dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatRippleModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    exports: [
        GroupSelectDialog,
        GroupEditorDialog
    ],
    declarations: [
        GroupSelectDialog,
        GroupEditorDialog
    ]
})

export class GroupsModule {}