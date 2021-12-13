import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../../core/services/location.service';
import { Location } from '../../../../shared/models/location.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private _locationService: LocationService, private _activatedRoute: ActivatedRoute) {
  }

  result: Location[] = []
  selectedLocation: Location
  myControl = new FormControl()

  ngOnInit(): void {
    let locationKey = '215854'
    this._activatedRoute.paramMap.subscribe(params => {
      if (params["params"]['locationKey'])
        locationKey = params["params"]['locationKey']
      this._locationService.getLocationByKey(locationKey).subscribe(data => this.selectedLocation = data)
    })
  }

  onKeyUp(val: string): void {
    this._locationService.getAutocompleteLocation(val).subscribe(data => this.result = data)
  }

  onOptionClick(selectedLoc: Location) {
    this.result = []
    this.selectedLocation = selectedLoc
  }

}
