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

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _carService: CarService
	){
		this.title = 'Inicio';
	}

	ngOnInit(){
		console.log('default.component cargado correctamente!!');
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

}