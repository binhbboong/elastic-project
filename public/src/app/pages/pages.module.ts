import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ChartsModule } from './charts/charts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { TopCountryComponent } from './top-country/top-country.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ChartsModule,
    NbCardModule,
    NbAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbSelectModule,
    NbButtonModule
  ],
  declarations: [
    PagesComponent,
    HomepageComponent,
    TopCountryComponent,
    CompareComponent
  ],
})
export class PagesModule {
}
