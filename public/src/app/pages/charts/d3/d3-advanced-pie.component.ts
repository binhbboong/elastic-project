import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-advanced-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [label]="'Total Confirmed'"
      [results]="result">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieComponent implements OnDestroy {
  @Input() result: any;

  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.dangerLight, colors.warningLight, colors.primaryLight, colors.successLight, colors.infoLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
