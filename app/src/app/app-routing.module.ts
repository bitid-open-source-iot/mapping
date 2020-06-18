/* PAGES */
import { MapComponent } from './pages/map/map.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

/* MODULES */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* SERVICES */
import { AuthManager } from './services/auth/auth.manager';

const routes: Routes = [
	{
		'path': 		'map',
		'component': 	MapComponent,
		'canActivate': 	[AuthManager]
	},
	{
		'path': 		'notifications',
		'component': 	NotificationsComponent,
		'canActivate': 	[AuthManager]
	},
	{
		'path': 		'help',
		'component': 	HelpComponent
	},
	{
		'path': 		'home',
		'component': 	HomeComponent
	},
	{
		'path': 		'login',
		'component': 	LoginComponent
	},
	{
		'path': 		'privacy-policy',
		'component': 	PrivacyPolicyComponent
	},
	{
		'path': 		'**',
		'component': 	NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}