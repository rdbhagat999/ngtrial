import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IncDecComponent } from "../inc-dec/inc-dec.component";
import { RangeInputComponent } from "../range-input/range-input.component";

@Component({
  selector: "app-range-counter",
  standalone: true,
  imports: [CommonModule, RangeInputComponent, IncDecComponent],
  template: `
    <div
      class="w-full flex flex-col mx-auto justify-center md:flex-row md:justify-around items-center my-4"
      *ngFor="let item of links">
      <app-range-input
        class="w-full"
        [rangeLabel]="item.label"
        [counter]="item.counter"
        (onChangeEvent)="item.counter = $event"></app-range-input>
      <app-inc-dec
        [counter]="item.counter"
        (onChangeEvent)="item.counter = $event"></app-inc-dec>
    </div>

    <div class="flex justify-center md:justify-end mt-8">
      <button
        (click)="resetCounter()"
        type="button"
        class="w-40 text-white capitalize bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Clear All
      </button>
    </div>
  `,
  styles: [],
})
export class RangeCounterComponent {
  @Input() links = [
    { label: "Neuro", counter: 5 },
    { label: "Cancer", counter: 5 },
    { label: "Heart", counter: 5 },
    { label: "Other", counter: 5 },
    { label: "Respiratory", counter: 5 },
    { label: "Stroke", counter: 5 },
  ];

  resetCounter() {
    this.links = [
      { label: "Neuro", counter: 5 },
      { label: "Cancer", counter: 5 },
      { label: "Heart", counter: 5 },
      { label: "Other", counter: 5 },
      { label: "Respiratory", counter: 5 },
      { label: "Stroke", counter: 5 },
    ];
  }
}
