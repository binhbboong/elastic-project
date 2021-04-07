import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
    
  }

  initForm() {
    this.formSearchCountry = this.fb.group({
      country: ['Vietnam'],
      date: [new Date()]
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
    console.log("🚀 ~ file: homepage.component.ts ~ line 60 ~ HomepageComponent ~ submit ~ formValue", formValue)
  }
}