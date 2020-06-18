import { MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth/auth.service';
import { MenuService } from './../../services/menu/menu.service';
import { ToastrService } from 'ngx-toastr';
import { BrandingService } from '@bitid/branding';
import { FormErrorService } from './../../services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { ResetPasswordComponent } from './../../components/reset-password/reset-password.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:     'login',
    styleUrls:    ['./login.component.scss'],
    templateUrl:  './login.component.html'
})

export class LoginComponent {

    constructor(private dialog: MatDialog, private service: AuthService, private router: Router, private route: ActivatedRoute, private branding: BrandingService, private formerror: FormErrorService, private toast: ToastrService, private menu: MenuService) {};

    public form:        FormGroup;
    public brand:       any = {};
    public params:      any;
    public errors:      any = {
        'email':        '',
        'password':     ''
    };
    public loading:     boolean;

    public async login() {
        this.loading = true;

        const response = await this.service.login({
            'email':    this.form.value.email,
            'password': this.form.value.password
        });
      
        this.loading = false;

        if (response.ok) {
            if (typeof(this.params) != "undefined") {
                if (typeof(this.params.replaceUrl) != "undefined") {
                    this.router.navigate([this.params.replaceUrl]);
                } else {
                    this.router.navigate(['/devices']);
                };
            } else {
                this.router.navigate(['/devices']);
            };
            this.toast.success("Sign in was successful!", "WELCOME");
        } else {
            let message: string;
            if (response.error.type == "authenticate") {
                if (response.error.code == "69" || response.error.code == "70" || response.error.code == "71") { 
                        message = "The email you are using is either not registered or you haven't varified the account!"
                } else if (response.error.code == "401") { 
                    message = "Invalid email or password!"
                };
                this.toast.error(message);
            } else if (response.error.type == "allowaccess") { 
                this.toast.error("Something went wrong allowing you access, try again!");
            };
        };
    };

    public async resetpassword() {
        this.dialog.open(ResetPasswordComponent, {
            'panelClass': 'reset-password-dialog'
        });
    };

    ngOnInit() {
        this.menu.close();
        
        this.route.queryParams.subscribe(params => {
            this.params = params;
        });
        
        this.form = new FormGroup({
            'email':    new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required])
        });

        this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.branding.branding.subscribe((brand: any) => {
            this.brand = brand;
        });
    };
}