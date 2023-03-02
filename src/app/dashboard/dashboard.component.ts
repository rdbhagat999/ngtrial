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
    <div class="rounded-lg border-4 border-gray-200">
      <div
        class="w-full flex flex-col justify-start sm:flex-row md:justify-between lg:justify-around items-start px-4 my-4 sm:space-x-12">
        <div class="w-full">
          <div
            class="flex flex-col justify-start md:flex-row md:justify-between items-center">
            <div class="relative w-full md:w-1/2 h-48">
              <app-gauge id="chartId1"></app-gauge>
            </div>
            <div class="relative w-full md:w-1/2 h-48">
              <app-gauge id="chartId2"></app-gauge>
            </div>
          </div>
          <div class="w-full mt-16">
            <app-range-counter
              class="w-full space-y-8 lg:space-y-4"></app-range-counter>
          </div>
        </div>

        <div class="w-full mt-8 sm:mt-0 md:w-1/2">
          <app-card
            *ngFor="let item of data"
            [item]="item"></app-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
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
      isCapacity: true,
      capacity: [
        {
          title: "Adjusted Capacity",
          capacity: 38,
        },
        {
          title: "Average Capacity",
          capacity: 50,
        },
      ],
    },
  ];
}
