import Quagga from 'quagga';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'scanner',
    styleUrls:      ['./scanner.component.scss'],
    templateUrl:    './scanner.component.html'
})

export class ScannerComponent implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<ScannerComponent>, @Inject(MAT_DIALOG_DATA) private config: any) {};

    public width:   number = window.innerWidth;
    public height:  number = window.innerHeight;
    private video:  any;
    private stream: any;

    public close() {
        this.dialog.close(false);
    };

    private async stop() {
        Quagga.stop()
        this.stream.getTracks().forEach(track => {
            track.stop()
        });
    };

    private async start() {
        this.video = document.getElementById('video');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({'video': true}).then(stream => {
                this.stream             = stream;
                this.video.srcObject    = this.stream;
                this.video.play();
                Quagga.init({
                    'inputStream': {
                        'name':     "Live",
                        'type':     "LiveStream",
                        'target':   this.video
                    },
                    'decoder': {
                        'readers': [
                            "code_128_reader",
                            // "ean_reader",
                            // "ean_8_reader",
                            // "code_39_reader",
                            // "code_39_vin_reader",
                            // "codabar_reader",
                            // "upc_reader",
                            // "upc_e_reader",
                            // "i2of5_reader",
                            // "2of5_reader",
                            // "code_93_reader",
                        ]
                    }
                }, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        Quagga.start();
                        Quagga.onDetected(result => {
                            Quagga.offDetected();
                            this.dialog.close(result.codeResult.code);
                            this.stream.getTracks().forEach(track => {
                                track.stop()
                            });
                        });
                    };
                });
            });
        };
    };

    ngOnInit(): void {
        this.start();
    };
    
    ngOnDestroy(): void {
        this.stop();
    };

}