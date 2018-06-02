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
	public status: string;

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
	}

	onSubmit(form){
		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = response.status;
					console.log(response);

					// Nueva petición para obtener el usuario en claro
					this._userService.signup(this.user, true).subscribe(
						response => {
							this.status = response.status;
							console.log(response);

							// vaciar el modelo y formulario
							this.user = new User(1, 'ROLE_USER', '', '', '', '');
							form.reset();
						},
						error => {
							console.log(<any>error);
						}
					);

				}else{
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}