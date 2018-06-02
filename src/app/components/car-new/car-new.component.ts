import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car'; 

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
	public page_title: string;
	public identity;
	public token;
	public car: Car;
	public status_car: String;
	public car_error: String;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _carService: CarService
  ){
  	this.page_title = "Crear nuevo coche";
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.car_error = null;
  }

  ngOnInit(){
  	if(this.identity == null)
  		this._router.navigate(['/login']);
  	else{
  		// Crear objeto coche
  		this.car = new Car(1, '', '', 1, null, null, null);
  	}
  }

  onSubmit(form){

  	// Convertir checkbox value a boolean para peticion AJAX
  	if(this.car.status == null)
  		this.car.status = 'false';

  	this.car.status = this.car.status.toString();

  	console.log(this.car);
  	
  	this._carService.create(this.token, this.car).subscribe(

  		response => {
  			
  			if (response.status == 'success'){
  				this.car = response.car;
  				this.status_car = 'success';

  				// Limpiamos el modelo por si quiere seguir introduciendo
  				this.car = new Car(1, '', '', 1, null, null, null);
  				form.reset();
  			}else{
  				this.status_car = 'error';
  			}
		
  		},
  		error => {
  			console.log(<any>error);
  			this.status_car = 'error';
  			this.car_error = JSON.stringify(error.error);
  		}
  	)
  }

}
