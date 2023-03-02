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
        class="w-full flex flex-col md:flex-row justify-start md:justify-between items-start px-4 my-8">
        <div class="">
          <!-- <div class="flex justify-between items-start">
          <div>
            <app-gauge id="chartId1"></app-gauge>
          </div>
          <div>
            <app-gauge id="chartId2"></app-gauge>
          </div>
        </div> -->
          <div class="md:mt-52">
            <app-range-counter class="space-y-10"></app-range-counter>
          </div>
        </div>

        <div class="">
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
      title: "Adjusted Capacity",
      current: {
        label: "current",
        price: "38",
      },
      adjusted: {
        label: "adjusted",
        price: "0",
      },
    },
  ];
}
