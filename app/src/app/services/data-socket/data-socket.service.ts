import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { LocalstorageService } from './../localstorage/localstorage.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DataSocketService {

	private url: 			string;
	public 	data: 			any		= new Subject();
	public 	error: 			any 	= new Subject();
	public 	status: 		any		= new BehaviorSubject('disconnected');
	private socket: 		any;
	private autoreconnect: 	boolean;

	constructor(private localstorage: LocalstorageService) {};

	public connect(url, autoreconnect?) {
		return new Promise((resolve, reject) => {
			this.url			= url + '?email=' + this.localstorage.get('email') + '&token=' + this.localstorage.get('token') + '&appId=' + environment.appId;
			this.socket 		= new WebSocket(this.url);
			this.autoreconnect 	= autoreconnect;

			this.socket.onopen 	= (event) => {
				console.log('connected');
				this.status.next('connected');
			};
			this.socket.onclose = (event) => {
				console.log('disconnected');
				this.status.next('disconnected');
				if (this.autoreconnect) {
					if (event.code != "4001") {
						this.reconnect();
					} else {
						this.error.next({
							'code': 	401,
							'message': 	'Invalid Credentials!'
						});
					};
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
			console.log('reconnecting');
			this.disconnect()
			.then(res => this.connect(this.url))
			.then(res => {
				resolve();
			}, err => {
				reject();
			});
		});
	};

	public disconnect() {
		return new Promise((resolve, reject) => {
			this.socket.close(1000);
			resolve();
		});
	};
}