import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GaugeMeterComponent } from "../gauge-meter/gauge-meter.component";

@Component({
  selector: "app-multi-gauge",
  standalone: true,
  imports: [CommonModule, GaugeMeterComponent],
  template: `
    <div
      class="flex flex-col justify-start items-center md:flex-row md:justify-center">
      <app-gauge-meter
        chartId="chartId1"
        chartLabel="Current"></app-gauge-meter>

      <app-gauge-meter
        chartId="chartId2"
        chartLabel="Adjusted"></app-gauge-meter>
    </div>
  `,
  styles: [],
})
export class MultiGaugeComponent {}
