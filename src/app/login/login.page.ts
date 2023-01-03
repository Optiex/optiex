import { Component, OnInit } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

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
		private alertController: AlertController,
		private router: Router,
    private navCtrl: NavController,
		private loadingController: LoadingController
	) {}

	async ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async login() {
    console.log(this.credentials.value);
	let obj = {
		username: this.credentials.value.email,
		password:this.credentials.value.password
	}
	const loading = await this.loadingController.create();
	await loading.present();

	this.loginService.login(obj).subscribe(
		async (resp:any) => {
			await loading.dismiss();

			if(resp.status){
				var userDetails = {
					username: resp.username,
					role: resp.role,
					sessionid: resp.sessionid,
					user: resp.user,
					date_joined: resp.date_joined
				};

				await this.storage.set('user', JSON.stringify(userDetails));
				this.navCtrl.navigateRoot('/dashboard/departments');
			} else {
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: resp.validation,
					buttons: ['Ok']
				});
				await alert.present();
			}
		},
		async (res:any) => {
			await loading.dismiss();
			const alert = await this.alertController.create({
				header: 'Login failed',
				message: res.error.error,
				buttons: ['OK']
			});

			await alert.present();
		}
	);

	// ionic http package
	// Http.request({ url: `${environment.SERVER_ADDRESS}/c/login/`, method: 'POST' })
    //   .then(async response => {
	// 	  alert('Login Success');
	// 	  console.log('================')
	// 	  console.log(response)
	// 	  console.log('================')
	// 	  alert(JSON.stringify(response));
    //   })
    //   .catch(e => {
	// 	  console.log(e)
	// 	  alert(JSON.stringify(e));
    //   })


	}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
}
