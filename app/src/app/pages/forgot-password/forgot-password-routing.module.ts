import { NgModule } from '@angular/core';
import { ForgotPasswordPage } from './forgot-password.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ForgotPasswordPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForgotPasswordRoutingModule {}