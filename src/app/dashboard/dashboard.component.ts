import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GaugeComponent } from "../gauge/gauge.component";
import { RangeCounterComponent } from "../range-counter/range-counter.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RangeCounterComponent, GaugeComponent, CardComponent],
  template: `
    <div class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="grid-span-1 md:grid-span-2">
          <!-- <div class="flex justify-between items-start">
          <div>
            <app-gauge id="chartId1"></app-gauge>
          </div>
          <div>
            <app-gauge id="chartId2"></app-gauge>
          </div>
        </div> -->
          <div>
            <app-range-counter></app-range-counter>
          </div>
        </div>

        <div class="grid-span-1 md:grid-span-2">
          <app-card
            *ngFor="let item of data"
            [item]="item"></app-card>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {
  data = [
    {
      title: "Payment Under Cap",
      current: {
        label: "current",
        price: "1333333",
      },
      adjusted: {
        label: "adjusted",
        price: "2356",
      },
    },
    {
      title: "Allowable Medicare Pay",
      current: {
        label: "current",
        price: "4565677",
      },
      adjusted: {
        label: "adjusted",
        price: "6356",
      },
    },
    {
      title: "Medicare Revenue",
      current: {
        label: "current",
        price: "16578006",
      },
      adjusted: {
        label: "adjusted",
        price: "18578006",
      },
    },
    {
      title: "Adjusted Capacity",
      current: {
        label: "current",
        price: "16578006",
      },
      adjusted: {
        label: "adjusted",
        price: "18578006",
      },
    },
  ];
}
