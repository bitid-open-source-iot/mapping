import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule
    ],
    declarations: [ForgotPasswordPage]
})

export class ForgotPasswordModule {}