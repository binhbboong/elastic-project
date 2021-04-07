import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MESSAGE } from '../../constants/message';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ngx-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
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
      date: [new Date()]
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
    console.log("🚀 ~ file: homepage.component.ts ~ line 60 ~ HomepageComponent ~ submit ~ formValue", formValue)
  }
}