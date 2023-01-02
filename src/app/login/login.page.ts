import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
    private storage: Storage,
		// private alertController: AlertController,
		private router: Router,
    private navCtrl: NavController,
		// private loadingController: LoadingController
	) {}

	async ngOnInit() {
		this.credentials = this.fb.group({
			email: ['nikhil', [Validators.required]],
			password: ['optiex@123', [Validators.required, Validators.minLength(6)]]
		});
	}

	login() {
    console.log(this.credentials.value);
	let obj = {
		username: this.credentials.value.email,
		password:this.credentials.value.password
	}
	// this.navCtrl.navigateRoot('/dashboard/departments');
    // const loading = await this.loadingController.create();
		// await loading.present();

		this.loginService.login(obj).subscribe(
			async (resp:any) => {
				// await loading.dismiss();
				alert('login success')
				alert(resp)

				var userDetails = {
					username: resp.username,
					role: resp.role,
					sessionid: resp.sessionid,
					user: resp.user,
					date_joined: resp.date_joined
				};

				await this.storage.set('user', JSON.stringify(userDetails));
				this.navCtrl.navigateRoot('/dashboard/departments');
				// this.navCtrl.navigateRoot('/dashboard/equipments');
			},
			async (res:any) => {
				alert('login Error')
				alert(JSON.stringify(res))
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
