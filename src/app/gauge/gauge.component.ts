import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

@Component({
  selector: "app-gauge",
  template: `
    <div class="relative flex flex-col items-center justify-between">
      <div
        id="chartdiv"
        class="relative w-full h-[500]">
        <div class="absolute bottom-14 left-1/2 -ml-6 z-10">
          <div
            class="flex justify-center items-center p-4 w-12 h-12 rounded-full bg-blue-500 text-white">
            {{ currentValue }}
          </div>
        </div>
      </div>

      <button
        class="mt-4 px-4 py-1 bg-blue-500 text-white rounded"
        (click)="updateValue()">
        Set random value
      </button>
    </div>
  `,
  styles: [],
})
export class GaugeComponent implements OnInit {
  private root!: am5.Root;
  private chart!: am5radar.RadarChart;
  private axisRenderer!: am5radar.AxisRendererCircular;
  private xAxis!: am5xy.ValueAxis<am5xy.AxisRenderer>;
  private axisDataItem!: am5.DataItem<am5xy.IValueAxisDataItem>;
  currentValue = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      this.root = am5.Root.new("chartdiv");

      this.root.setThemes([am5themes_Responsive.new(this.root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/radar-chart/
      this.chart = this.root.container.children.push(
        am5radar.RadarChart.new(this.root, {
          panX: false,
          panY: false,
          startAngle: 180,
          endAngle: 360,
        })
      );

      // Create axis and its renderer
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
      this.axisRenderer = am5radar.AxisRendererCircular.new(this.root, {
        innerRadius: -10,
        strokeOpacity: 1,
        strokeWidth: 15,
        strokeGradient: am5.LinearGradient.new(this.root, {
          rotation: 0,
          stops: [
            { color: am5.color(0x19d228) },
            { color: am5.color(0xf4fb16) },
            { color: am5.color(0xf6d32b) },
            { color: am5.color(0xfb7116) },
          ],
        }),
      });

      this.xAxis = this.chart.xAxes.push(
        am5xy.ValueAxis.new(this.root, {
          maxDeviation: 0,
          min: 0,
          max: 100,
          strictMinMax: true,
          renderer: this.axisRenderer,
        })
      );

      // Add clock hand
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
      this.axisDataItem = this.xAxis.makeDataItem({});
      this.axisDataItem.set("value", 0);

      var bullet = this.axisDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(this.root, {
          sprite: am5radar.ClockHand.new(this.root, {
            radius: am5.percent(99),
          }),
        })
      );

      this.xAxis.createAxisRange(this.axisDataItem);

      this.axisDataItem?.get("grid")?.set("visible", false);

      // setInterval(() => {
      //   this.axisDataItem.animate({
      //     key: "value",
      //     to: Math.round(Math.random() * 100),
      //     duration: 800,
      //     easing: am5.ease.out(am5.ease.cubic),
      //   });
      // }, 2000);

      this.updateValue();

      // Make stuff animate on load
      this.chart.appear(1000, 100);

      // this.root = root;
    });
  }

  updateValue() {
    this.currentValue = Math.round(Math.random() * 100);

    this.axisDataItem.animate({
      key: "value",
      to: this.currentValue,
      duration: 800,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  ngOnInit() {}
}
