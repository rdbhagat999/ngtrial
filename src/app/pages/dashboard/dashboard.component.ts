import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  RangeCounterComponent,
  GaugeComponent,
  CardComponent,
  MultiGaugeComponent,
} from "../../components";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RangeCounterComponent,
    GaugeComponent,
    CardComponent,
    MultiGaugeComponent,
  ],
  template: `
    <div class="rounded-lg border-4 border-gray-200">
      <div
        class="w-full flex flex-col justify-start sm:flex-row md:justify-between lg:justify-around items-start px-4 my-4 sm:space-x-12">
        <div class="w-full">
          <!-- <div
            class="flex flex-col justify-start md:flex-row md:justify-center items-center">
            <div class="relative w-full md:w-1/2 h-48">
              <app-gauge
                chartId="chartId1"
                chartLabel="current"></app-gauge>
            </div>
            <div class="relative w-full md:w-1/2 h-48">
              <app-gauge
                chartId="chartId2"
                chartLabel="adjusted"></app-gauge>
            </div>
          </div> -->
          <app-multi-gauge></app-multi-gauge>

          <div class="w-full mt-8">
            <app-range-counter class="w-full space-y-8"></app-range-counter>
          </div>
        </div>

        <div
          class="w-full mt-8 sm:mt-0 md:flex md:flex-col md:justify-end md:items-end md:w-1/2">
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
