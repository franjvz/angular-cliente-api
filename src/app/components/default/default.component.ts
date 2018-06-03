import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
	selector: 'default',
	templateUrl: './default.component.html',
	providers: [UserService, CarService]
})

export class DefaultComponent implements OnInit{
	public title: string;
	public cars: Array<Car>;
	public token:string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _carService: CarService
	){
		this.title = 'Inicio';
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		console.log('default.component cargado correctamente!!');
		this.getCars();
	}

	getCars(){
		this._carService.getCars(this._userService.getToken()).subscribe(

			response => {
				if(response.status == 'success')
					this.cars = response.cars;
			},
			error =>{
				console.log(error);
			}

		);
	}

	deleteCar(id){
		this._carService.delete(this.token, id).subscribe(
			response => {
				this.getCars();
			},
			error => {
				console.log(error);
			}
		)	
	}

}