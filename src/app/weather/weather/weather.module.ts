import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CityWeatherComponent } from './pages/city-weather/city-weather.component';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [SearchPage, FavoritesPage,CityWeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class WeatherModule {}
