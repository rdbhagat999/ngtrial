import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexStroke,
  ApexFill,
  ChartComponent,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: any;
  stroke: ApexStroke;
};

@Component({
  selector: "app-gauge-meter",
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <div
      [id]="chartId"
      class="chart p-0 w-full max-w-[250px]">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [plotOptions]="chartOptions.plotOptions"
        [labels]="chartOptions.labels"
        [fill]="chartOptions.fill"></apx-chart>
    </div>
  `,
  styles: [``],
})
export class GaugeMeterComponent implements OnInit, OnDestroy {
  @Input() chartId!: string;
  @Input() chartLabel!: string;
  @ViewChild("chart") chart!: ChartComponent;

  chartOptions!: ChartOptions;
  private timer = 0;

  ngOnInit() {
    this.initChart();
    this.updateValue();
  }

  initChart() {
    this.chartOptions = {
      series: [76],
      chart: {
        type: "radialBar",
        offsetY: -20,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "50%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          startAngle: -110,
          endAngle: 110,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -2,
              left: 0,
              blur: 2,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -16,
              color: "#888",
              show: true,
            },
            value: {
              offsetY: -2,
              color: "#888",
              fontSize: "22px",
              show: true,
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString();
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          // gradientToColors: ["#ABE5A1"],
          colorStops: [
            {
              offset: 0,
              color: "red",
              opacity: 0.8,
            },
            {
              offset: 40,
              color: "orange",
              opacity: 0.7,
            },
            {
              offset: 70,
              color: "yellow",
              opacity: 0.8,
            },
            {
              offset: 80,
              color: "green",
              opacity: 0.7,
            },
          ],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [this.chartLabel],
    };
  }

  updateValue() {
    this.timer = window.setInterval(() => {
      const v = Math.round(Math.random() * 100);
      this.chartOptions.series = [v];
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
