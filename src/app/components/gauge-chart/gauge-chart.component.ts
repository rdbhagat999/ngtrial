import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { NgChartsModule } from "ng2-charts";
import { Chart, ChartConfiguration } from "chart.js";

@Component({
  selector: "app-gauge-chart",
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div class="chartBox relative mx-auto w-full max-w-[250px]">
      <canvas [id]="chartId"></canvas>
    </div>
  `,
  styles: [
    `
      .chartBox {
        /* padding: 20px;
        border-radius: 20px;
        border: solid 3px rgba(54, 162, 235, 1); */
        background: white;
      }
    `,
  ],
})
export class GaugeChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartId: string = "chartId1";
  @Input() chartLabel: string = "chartLabel1";
  @Input() needleValue: number = 70;

  myChart!: any;
  chartWidth!: any;
  myChartEl!: any;
  ctx!: any;
  gradientSegment!: any;
  timer = 0;

  addData(chart: any, label: any, data: any) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  updateNeedle(chart: any, label: any, data: any) {
    chart.data.labels = [label];
    chart.data.datasets.forEach((dataset: any) => {
      dataset.needleValue = data;
    });
    chart.update();
  }

  removeData(chart: any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.pop();
    });
    chart.update();
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.chartWidth =
      this.document.querySelector(".chartBox")!.getBoundingClientRect().width -
        40 || 250;

    // console.log("this.chartWidth", this.chartWidth);

    this.myChartEl = this.document.getElementById(this.chartId);

    // console.log("this.myChartEl", this.myChartEl);

    this.ctx = this.myChartEl.getContext("2d");

    // console.log("this.ctx", this.ctx);

    this.gradientSegment = this.ctx.createLinearGradient(
      0,
      0,
      this.chartWidth,
      0
    );

    this.gradientSegment.addColorStop(0.2, "red");
    this.gradientSegment.addColorStop(0.5, "orange");
    this.gradientSegment.addColorStop(0.85, "yellow");
    this.gradientSegment.addColorStop(1, "green");

    const data = {
      labels: ["Chart label"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [100],
          // backgroundColor: [gradientSegment, 'rgba(0, 0, 0, 0.2)'],
          // borderColor: [gradientSegment, 'rgba(0, 0, 0, 0.2)'],
          backgroundColor: [this.gradientSegment],
          borderColor: [this.gradientSegment],
          borderWidth: 1,
          cutout: "80%",
          circumference: 180,
          rotation: 270,
          needleValue: this.needleValue,
        },
      ],
    };

    const gaugeChartText = {
      id: "gaugeChartText",
      afterDatasetsDraw: (chart: any, args: any, pluginOptions: any) => {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { r },
        } = chart;

        ctx.save();

        const coodX = chart.getDatasetMeta(0).data[0].x;
        const coodY = chart.getDatasetMeta(0).data[0].y;

        // const score = data.datasets[0].data[0];
        const score = data.datasets[0].needleValue;
        let rating;

        if (score < 50) {
          rating = "Bad";
        } else if (score > 90) {
          rating = "Excellent";
        } else {
          rating = "Average";
        }

        // ctx.fillRect(coodX, coodY, 700, 1);

        function textLabel(
          text: any,
          x: any,
          y: any,
          fontSize: any,
          textBaseLine: any,
          textAlign: any
        ) {
          ctx.font = `${fontSize}px san-serif`;
          ctx.fillStyle = "#666";
          ctx.textBaseLine = textBaseLine;
          ctx.textAlign = textAlign;
          ctx.fillText(text, x, y);
        }

        textLabel("0", left + 5, coodY + 20, 20, "top", "left");
        textLabel("100", right, coodY + 20, 20, "top", "right");
        textLabel(`${score}%`, coodX, coodY - 20, 32, "bottom", "center");
        textLabel(
          `${this.chartLabel}`,
          coodX,
          coodY - 75,
          16,
          "bottom",
          "center"
        );
      },
    };

    const gaugeNeedle = {
      id: "gaugeNeedle",
      afterDatasetsDraw: (chart: any, args: any, pluginOptions: any) => {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { r },
        } = chart;

        ctx.save();

        const cx = width / 2;
        const cy = chart.getDatasetMeta(0).data[0].y;

        const dataTotal = data.datasets[0].data.reduce(
          (a: any, b: any) => a + b,
          0
        );
        const needleValue = data.datasets[0].needleValue;
        const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;

        // needle
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(height - ctx.canvas.offsetTop - 50, 0);
        ctx.lineTo(0, 5);
        ctx.fillStyle = "#e9967a";
        ctx.fill();
        ctx.restore();

        // needle dot
        // ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.fillStyle = "#e9967a";
        ctx.arc(cx, cy, 10, 0, 10);
        ctx.fill();
        ctx.restore();
      },
    };

    // config
    const config = {
      type: "doughnut",
      data,
      options: {
        animation: {
          animateRotate: false,
          animateScale: false,
        },
        aspectRatio: 1.5,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          subtitle: {
            display: false,
            text: "Custom Chart Subtitle",
          },
          title: {
            display: false,
            text: "Custom Chart Title",
          },
        },
      },
      plugins: [gaugeChartText, gaugeNeedle],
    };

    // render init block
    this.myChart = new Chart(this.myChartEl, config as any);

    this.updateNeedleValue();
  }

  updateNeedleValue() {
    this.timer = window.setInterval(() => {
      const v = Math.round(Math.random() * 100);
      this.updateNeedle(this.myChart, "label", v);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
