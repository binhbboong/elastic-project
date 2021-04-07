import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment'

import { MESSAGE } from '../../constants/message';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ngx-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  options: string[];
  result: any;
  formSearchCountry: FormGroup;
  filteredControlOptions$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getListCountry();
    this.submit(this.formSearchCountry.value);
  }

  initForm() {
    this.formSearchCountry = this.fb.group({
      country: ['Vietnam'],
      date: [new Date("08-01-2020")],
    })
  }

  getListCountry() {
    this.apiService.getListCountry().subscribe((res: any) => {
      this.options = res;
      this.filteredControlOptions$ = of(this.options);
    
    this.filteredControlOptions$ = this.formSearchCountry.get('country').valueChanges
      .pipe(
        startWith(''),
        map((filterString: string) => this.filter(filterString)),
      );
    }, resError => {
      this.helperService.showError(MESSAGE.ERROR);
    })
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  submit(formValue) {
    const data = {
      query: {
        "countryRegions": [formValue.country],
        "date": moment(formValue.date).format('YYYY-MM-DD')
      }
    }
    this.apiService.getDetailCountry(data).subscribe((res: any) => {
      if (res && res.length) {
        const response = Object.values(res[0].series);
        this.result = response;
      }
    }, resError => {
      this.helperService.showError(MESSAGE.ERROR);
    })
  }
}