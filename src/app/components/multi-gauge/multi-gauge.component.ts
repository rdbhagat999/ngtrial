import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GaugeChartComponent } from "../gauge-chart/gauge-chart.component";
import { GaugeEchartComponent } from "../gauge-echart/gauge-echart.component";

@Component({
  selector: "app-multi-gauge",
  standalone: true,
  imports: [CommonModule, GaugeChartComponent, GaugeEchartComponent],
  template: `
    <div
      class="flex flex-col justify-start md:flex-row md:justify-center items-center">
      <div class="relative w-full md:w-1/2 h-48">
        <app-gauge-chart
          chartId="chartId1"
          [needleValue]="65"
          chartLabel="Current"></app-gauge-chart>
      </div>
      <div class="relative w-full md:w-1/2 h-48">
        <app-gauge-chart
          chartId="chartId2"
          [needleValue]="75"
          chartLabel="Adjusted"></app-gauge-chart>
      </div>
    </div>

    <div
      class="flex flex-col justify-start md:flex-row md:justify-center items-center">
      <div class="relative w-full md:w-1/2 h-48">
        <app-gauge-echart
          chartId="chartId3"
          chartLabel="Current"
          [needleValue]="65"></app-gauge-echart>
      </div>
      <div class="relative w-full md:w-1/2 h-48">
        <app-gauge-echart
          chartId="chartId4"
          chartLabel="Adjusted"
          [needleValue]="75"></app-gauge-echart>
      </div>
    </div>
  `,
  styles: [],
})
export class MultiGaugeComponent {}
