import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import * as echarts from "echarts";

@Component({
  selector: "app-gauge-echart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [id]="chartId"
      class=" relative overflow-hidden h-full"></div>
  `,
  styles: [``],
})
export class GaugeEchartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartId: string = "chartId1";
  @Input() chartLabel: string = "chartLabel1";
  @Input() needleValue: number = 50;

  private chartDom: any;
  private myChart: any;
  private option: any;
  private timer: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  updateChart() {
    this.timer = window.setInterval(() => {
      this.needleValue = Math.round(Math.random() * 100);
      const opt = {
        ...this.option,
        ...this.option.series[0],
        ...(this.option.series[0].data = [
          {
            // value: 0.7,
            value: this.needleValue / 100,
            name: this.chartLabel,
          },
        ]),
      };
      this.myChart.setOption(opt);
    }, 3000);
  }

  initChart() {
    this.chartDom = this.document.getElementById(this.chartId);
    this.myChart = echarts.init(this.chartDom, undefined, {
      renderer: "svg",
      useDirtyRect: false,
    });

    this.option = {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          center: ["50%", "75%"],
          radius: "100%",
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.7, "#7CFFB2"], // green
                [0.85, "#FDDD60"], // yellow
                [1, "#FF6E76"], // red
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "12%",
            width: 20,
            offsetCenter: [0, "-55%"],
            itemStyle: {
              color: "rgb(30 58 138)",
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "inherit",
              width: 2,
            },
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: "inherit",
              width: 5,
            },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 20,
            distance: -70,
            rotate: "tangential",
            formatter: (value: number) => {
              // if (value === 0.875) {
              //   return "Grade A";
              // } else if (value === 0.625) {
              //   return "Grade B";
              // } else if (value === 0.375) {
              //   return "Grade C";
              // } else if (value === 0.125) {
              //   return "Grade D";
              // }
              return "";
            },
          },
          title: {
            offsetCenter: [0, "-10%"],
            fontSize: 14,
            color: "rgb(30 58 138)",
          },
          detail: {
            fontSize: 20,
            color: "rgb(30 58 138)",
            offsetCenter: [0, "-35%"],
            valueAnimation: true,
            formatter: (value: number) => {
              // return Math.round(value * 100) + "";
              return this.needleValue + "";
            },
          },
          data: [
            {
              // value: 0.7,
              value: this.needleValue / 100,
              name: this.chartLabel,
            },
          ],
        },
      ],
    };

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
