import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-area-stack',
  template: `
    <ngx-charts-bar-horizontal-2d
      [scheme]="colorScheme"
      [results]="result"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
    >
    </ngx-charts-bar-horizontal-2d>
  `,
})
export class D3AreaStackComponent implements OnDestroy {
  @Input() result: any;
  showLegend = true;
  autoScale = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Cases';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.warningLight, colors.primaryLight, colors.dangerLight, colors.infoLight, colors.successLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
