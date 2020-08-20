/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { AuthManager } from './services/account/account.manager';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         'map',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/map/map.module').then(m => m.MapModule)
    },
    {
        'path':         'notifications',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/notifications/notifications.module').then(m => m.NotificationsModule)
    },
    {
        'path':         'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path':         'signup',
        'loadChildren': () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        'path':         'verify-account',
        'loadChildren': () => import('./pages/verify-account/verify-account.module').then(m => m.VerifyAccountModule)
    },
    {
        'path':         'forgot-password',
        'loadChildren': () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        'path':         'privacy-policy',
        'loadChildren': () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
    },
    {
        'path':         'terms-and-conditions',
        'loadChildren': () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
    },
    {
        'path':         '**',
        'redirectTo':   'map'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}