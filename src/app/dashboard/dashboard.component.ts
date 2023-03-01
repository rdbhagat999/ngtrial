import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GaugeComponent } from "../gauge/gauge.component";
import { RangeCounterComponent } from "../range-counter/range-counter.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RangeCounterComponent, GaugeComponent],
  template: `
    <div class="w-1/2">
      <app-range-counter></app-range-counter>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {}
