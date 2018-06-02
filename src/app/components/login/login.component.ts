import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers: [UserService]
})

export class LoginComponent implements OnInit{
	public title: string;
	public user: User;
	public token;
	public identity;
	public status: string;
	public message: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Identifícate';
		this.user = new User(1, 'ROLE_USER', '', '', '', '');
	}

	ngOnInit(){
		console.log('login.component cargado correctamente!!');
		this.logout();
	}

	onSubmit(form){

		this._userService.signup(this.user).subscribe(
			response => 
			{
				if(response.status == 'error'){
					this.status = response.status;
					this.message = response.message;
				}else{
					// Token
					this.token = response;
					localStorage.setItem('token', this.token);

					// Nueva petición para obtener el usuario en claro
					this._userService.signup(this.user, true).subscribe(
						response => {
							// Almacenar datos usuario en claro
							this.identity = response;
							localStorage.setItem('identity', JSON.stringify(this.identity));

							//Redireccion
							this._router.navigate(['home']);
						},
						error => {
							console.log(<any>error);
						}
					);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				// Redireccion
				this._router.navigate(['home']);
			}
		});
	}
}