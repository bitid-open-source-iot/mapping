import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DataSocketService {

	public 	data:	any	= new Subject();
	public 	error: 	any	= new Subject();
	public 	status: any	= new BehaviorSubject('disconnected');
	private socket: any;

	constructor(private localstorage: LocalstorageService) {};

	public connect() {
		return new Promise((resolve, reject) => {
			let url			= environment.socket + '?email=' + this.localstorage.get('email') + '&token=' + this.localstorage.get('token') + '&appId=' + environment.appId;
			this.socket 		= new WebSocket(url);

			this.socket.onopen 	= (event) => {
				console.log('connected');
				this.status.next('connected');
			};
			this.socket.onclose = (event) => {
				console.log('disconnected');
				this.status.next('disconnected');
				if (event.code != "4001") {
					this.reconnect();
				} else {
					this.error.next({
						'code': 	401,
						'message': 	'Invalid Credentials!'
					});
				};
			};
			this.socket.onerror = (error) => {
				this.error.next(error);
			};
			this.socket.onmessage = (message) => {
				this.data.next(JSON.parse(message.data));
			};
			resolve();
		});
	};

	public reconnect() {
		return new Promise((resolve, reject) => {
			console.log('reconnecting in a few seconds');
			setTimeout(() => {
				this.disconnect().then(res => this.connect()).then(res => {
					resolve();
				}, err => {
					reject();
				});
			}, 5000);
		});
	};

	public disconnect() {
		return new Promise((resolve, reject) => {
			this.socket.close(1000);
			resolve();
		});
	};
}