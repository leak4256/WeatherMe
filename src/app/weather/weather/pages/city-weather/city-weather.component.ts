import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';
import { Location } from '../../../../shared/models/location.model';
import { Forecast } from '../../../../shared/models/forecast.model';
import { CurrentWeather } from '../../../../shared/models/currentWeather.model';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})

export class CityWeatherComponent implements OnInit {
  constructor(private _weatherService: WeatherService, private _favoritesService: FavoritesService) { }
  currentLocation: Location
  currentWeather: CurrentWeather
  forecast: Forecast
  temperatureString: String

  @Input()
  set CurrentLocation(location: Location) {
    this.currentLocation = location

    this._weatherService.getCurrentWeather(this.currentLocation.Key).subscribe(data => {
      this.CurrentWeather = data;
      console.log("currentweather", data)
    },
      err => console.log(err)
    );

    this._weatherService.getForecast(this.currentLocation.Key).subscribe(data => {
      this.Forecast = data
    });
  }


  set Forecast(_forcast: Forecast) {
    this.forecast = _forcast
  }


  get Forecast(): Forecast {
    return this.forecast
  }


  set CurrentWeather(_weather: CurrentWeather) {
    this.currentWeather = _weather
    this.temperatureString = this._weatherService.getTemperatureString(this.currentWeather)
  }


  get CurrentWeather(): CurrentWeather {
    return this.currentWeather
  }


  addDays(i: number): Date {
    let newdate = new Date()
    newdate.setDate(newdate.getDate() + i)
    return newdate
  }


  imageSrc(icon: Number): string {
    return "../../../../../assets/weatherIcons/" + icon + ".svg"
  }


  isfavorite(): boolean {
    return this._favoritesService.getFavorites().filter(e => e.LocalizedName == this.currentLocation.LocalizedName).length > 0
  }


  onClickFavorite() {
    if (this.isfavorite())
      this._favoritesService.removeFromFavorites(this.currentLocation.Key)
    else
      this._favoritesService.addToFavorites(this.currentLocation)
  }


  ngOnInit(): void {
    this._weatherService.temperatureUnitChanged.subscribe(() => {
      this.temperatureString = this._weatherService.getTemperatureString(this.currentWeather)
      this._weatherService.getForecast(this.currentLocation.Key).subscribe((data) => {
        this.Forecast = data;
      });
    });
  }

}
