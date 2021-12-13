import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { WeatherService } from '../../../../core/services/weather.service';
import { CurrentWeather } from '../../../..//shared/models/currentWeather.model';
import { Location } from '../../../../shared/models/location.model'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})

export class FavoritesPage implements OnInit {
  constructor(private _favoritesService: FavoritesService, private _router: Router, private _weatherService: WeatherService) { }

  favorites: Location[]
  weatherList: CurrentWeather[] = []


  ngOnInit(): void {
    this.favorites = this._favoritesService.getFavorites()
    this.favorites.forEach(f => {
      this._weatherService.getCurrentWeather(f.Key).subscribe(data => {
        this.weatherList.push(data)
      }
        , erro => console.log(erro))
    })
  }

  onClickFavorite(locationKey: string) {
    this._router.navigate(['/search', { "locationKey": locationKey }])
  }

 onClickDelete(key:string){
    this._favoritesService.removeFromFavorites(key)
  }

  temperatureString(i: number): string {
    return this._weatherService.getTemperatureString(this.weatherList[i])
  }
}
