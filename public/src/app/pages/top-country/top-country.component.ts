import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment'

import { MESSAGE } from '../../constants/message';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ngx-top-country',
  templateUrl: './top-country.component.html',
  styleUrls: ['./top-country.component.scss']
})
export class TopCountryComponent implements OnInit {
  formTopCountry: FormGroup;
  result: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.submit(this.formTopCountry.value);
  }

  initForm() {
    this.formTopCountry = this.fb.group({
      status: ['confirmed'],
      fromDay: [new Date("10-10-2020")],
      toDay: [new Date("10-10-2020")]
    }, {
      validator: [
        this.checkDate('fromDay', 'toDay'),
      ]
    });
  }

  checkDate(fromDaykey: string, toDaykey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const fromDay = group.controls[fromDaykey];
      const toDay = group.controls[toDaykey];
      if (fromDay.value > toDay.value) {
        return {
          invalidDate: true
        };
      }
    };
  }

  submit(formValue) {
    if (this.formTopCountry.hasError('invalidDate')) {
			return;
		}
    const data = {
      query: {
        field: formValue.status,
        startDate: moment(formValue.fromDay).format('YYYY-MM-DD'),
        endDate: moment(formValue.toDay).format('YYYY-MM-DD')
      }
    }
    this.apiService.getTopCountry(data).subscribe((res: any) => {
      if (res && res.length) {
        this.result = res;
      }
    }, resError => {
      this.helperService.showError(MESSAGE.ERROR);
    })
  }
}
