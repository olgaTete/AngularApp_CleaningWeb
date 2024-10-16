import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class ServiceFormComponent implements OnInit {
  public city: string = ''; 
  public cityPrices: any = null; 
  public totalMetres: number = 0; 
  public selectedServices: { [key: string]: boolean } = {}; 
  public totalPrice: number | null = null; 
  public errorMessage: string = ''; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }
  
  getCityPrices(city: string): void {
    this.http.get<any>(`https://localhost:7036/api/Services/${city}`)
      .subscribe(
        (data) => {
          this.cityPrices = data;

          const services: { [key: string]: boolean } = {};
          data.services.forEach((service: any) => {
            services[service.options] = false;
          });
          this.selectedServices = services;
        },
        (error) => {
          console.error('Error fetching city prices:', error);
          this.errorMessage = 'Failed to fetch city prices';
          this.cityPrices = null;
        }
      );
  }
  onCityChange(city: string): void {
    this.city = city;
    if (this.city) {
      this.getCityPrices(this.city);
    }
  }

  onServiceChange(serviceName: string, isChecked: boolean): void {
    this.selectedServices[serviceName] = isChecked;
  }

  onTotalMetresChange(totalMetres: string): void {
    this.totalMetres = parseInt(totalMetres, 10);
  }

  calculateTotalPrice(): void {
    const selectedServicesList = Object.keys(this.selectedServices)
      .filter((service) => this.selectedServices[service]);

    const payload = {
      city: this.city,
      totalMetres: this.totalMetres,
      selectedServices: selectedServicesList
    };

    this.http.post<any>('https://localhost:7036/api/Services/CalculatePrice', payload)
      .subscribe(
        (result) => {
          this.totalPrice = result.totalPrice;
        },
        (error) => {
          console.error('Error calculating the total price:', error);
          alert('Error calculating the total price');
        }
      );
  }
}
