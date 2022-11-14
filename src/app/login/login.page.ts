import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';

import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationServiceService,
		// private alertController: AlertController,
		private router: Router,
		// private loadingController: LoadingController
	) {}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['nikhil', [Validators.required]],
			password: ['optiex@123', [Validators.required, Validators.minLength(6)]]
		});
	}

	async login() {
    console.log(this.credentials.value);
	let obj = {
		username: this.credentials.value.email,
		password:this.credentials.value.password
	}
    // const loading = await this.loadingController.create();
		// await loading.present();

		this.authService.login(obj).subscribe(
			async (resp) => {
				// await loading.dismiss();

				var userDetails = {
					username: resp.username,
					role: resp.role,
					sessionid: resp.sessionid,
					user: resp.user,
					date_joined: resp.date_joined
				};

				Storage.set({ key: 'user', value: JSON.stringify(userDetails) })

				this.router.navigateByUrl('/folder/Inbox/tab1', { replaceUrl: true });
			},
			async (res) => {
				// await loading.dismiss();
				// const alert = await this.alertController.create({
				// 	header: 'Login failed',
				// 	message: res.error.error,
				// 	buttons: ['OK']
				// });

				// await alert.present();
			}
		);
	}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
}
