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
        class="relative w-full h-[500]"></div>

      <button
        class="mt-8 px-4 py-1 bg-blue-500 text-white rounded"
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
  private bullet!: am5xy.AxisBullet;
  private clockHand!: am5radar.ClockHand;
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

      this.displayBullet();

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

  displayBullet() {
    this.clockHand = am5radar.ClockHand.new(this.root, {
      pinRadius: am5.percent(15),
      radius: am5.percent(100),
      bottomWidth: 20,
    });

    this.bullet = this.axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(this.root, {
        sprite: this.clockHand,
      })
    );

    var label = this.chart.radarContainer.children.push(
      am5.Label.new(this.root, {
        fill: am5.color(0xffffff),
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "3em",
      })
    );

    this.bullet.get("sprite").on("rotation", () => {
      var value = this.axisDataItem.get("value") || 0;
      // var text = Math.round(value).toString();
      var text = this.currentValue.toString();
      var defaultFill = am5.color("rgb(240, 73, 34)");
      var fill: am5.Color = defaultFill;

      this.xAxis.axisRanges.each((axisRange) => {
        const axisRangeValue = axisRange.get("value") || 0;
        const axisRangeEndValue = axisRange.get("value") || 0;

        if (value >= axisRangeValue && value <= axisRangeEndValue) {
          const axisFill = axisRange.get("axisFill");
          fill = axisFill?.get("fill") ?? defaultFill;
        }
      });

      label.set("text", text);

      this.clockHand.pin.animate({
        key: "fill",
        to: fill,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });

      this.clockHand.hand.animate({
        key: "fill",
        to: fill,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });
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
