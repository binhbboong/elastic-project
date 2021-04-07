import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment'

import { MESSAGE } from '../../constants/message';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ngx-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  result: any;
  formCompareCountry: FormGroup;
  options: string[];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getListCountry();
    
  }

  initForm() {
    this.formCompareCountry = this.fb.group({
      countries: [],
      date: [new Date("08-01-2020")],
    })
  }

  getListCountry() {
    this.apiService.getListCountry().subscribe((res: any) => {
      this.options = res;
    }, resError => {
      this.helperService.showError(MESSAGE.ERROR);
    })
  }

  submit(formValue) {
    const data = {
      query: {
        "countryRegions": formValue.countries,
        "date": moment(formValue.date).format('YYYY-MM-DD')
      }
    }
    this.apiService.getDetailCountry(data).subscribe((res: any) => {
      if (res && res.length) {
        this.result = res;
      }
    }, resError => {
      this.helperService.showError(MESSAGE.ERROR);
    })  }
}