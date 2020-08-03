import { environment } from './../../../environments/environment';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { Input, OnInit, Output, Component, OnChanges, ViewChild, EventEmitter } from '@angular/core';

@Component({
    selector:       'app-file-upload',
    styleUrls:      ['./file-upload.component.scss'],
    templateUrl:    './file-upload.component.html'
})

export class FileUploadComponent implements OnInit, OnChanges {

    constructor(private localstorage: LocalstorageService) {};

    public    invalid:  boolean;
    public    loading:  boolean;

    @Input()  file:     string;
    @Input()  accept:   string;
    @Input()  required: boolean;
    @Input()  disabled: boolean;

    @Output() error:  EventEmitter<any> = new EventEmitter<any>();
    @Output() valid:  EventEmitter<any> = new EventEmitter<any>();
    @Output() result: EventEmitter<any> = new EventEmitter<any>();
    
    @ViewChild('image', {
        static: true
    }) imageElement;
    
    public filesToUpload: Array<File> = [];

    public open(event) {
        document.getElementById("fileUploaderInput").click();
    };

    public fileChangeEvent(input: any) {
        this.filesToUpload = input.target.files;

        if (this.filesToUpload.length > 0) {
            this.makeFileRequest(environment.drive + "/drive/files/upload", [], this.filesToUpload)
            .then((res: any) => {
                this.file = environment.drive + "/drive/files/get?fileId=" + res.fileId + "&token=" + res.token;
                this.result.emit(this.file);
            }, err => {
                this.error.emit(err);
            });
        };
    };

    makeFileRequest(url: string, params: any, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            };
            
            xhr.onreadystatechange = (event) => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    };
                };
            };

            params = "?email=" + this.localstorage.get('email') + "&appId=" + environment.appId;

            xhr.open("POST", url + params, true);
            xhr.setRequestHeader('Authorization', this.localstorage.get('token'));
            xhr.send(formData);
        });
    };

    ngOnInit() {
        this.imageElement = this.imageElement.nativeElement;

        if (typeof(this.imageElement.src) == "undefined" || this.imageElement.src == "") {
            this.imageElement.style.display = "none";
        };
        this.imageElement.onload = (event) => {
            this.valid.emit(true);
            this.invalid               = false;
            this.loading               = false;
            event.target.style.display = "block";
        };
        this.imageElement.onerror = (event) => {
            if (event.target.src.indexOf("null") == -1) {
                delete this.file;
                this.valid.emit(false);
                this.invalid = true;
                this.loading = false;
            };
        };
    };

    ngOnChanges(changes) {
        if (changes.file) {
            this.file = changes.file.currentValue;
            if (typeof(this.file) != "undefined" && this.file != "") {
                this.valid.emit(true);
                this.invalid = false;
                this.loading = true;
            } else {
                this.valid.emit(false);
                this.invalid = true;
            };
        } else {
            this.valid.emit(false);
            this.invalid = true;
        };
        if (changes.accept) {
            this.accept = changes.accept.currentValue;
        };
        if (changes.disabled) {
            this.disabled = changes.disabled.currentValue;
        };
    };
}