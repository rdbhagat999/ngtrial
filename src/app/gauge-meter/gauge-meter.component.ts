import { Component, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: "app-gauge-meter",
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [],
})
export class GaugeMeterComponent {
  private root!: am5.Root;
  private chart!: am5radar.RadarChart;
  private axisRenderer!: am5radar.AxisRendererCircular;

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
    this.browserOnly(() => {
      this.root = am5.Root.new("chartdiv");
      this.root.setThemes([am5themes_Animated.new(this.root)]);
    });
  }
}
