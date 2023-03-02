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
  `,
  styles: [],
})
export class RangeCounterComponent {
  @Input() links = [
    { label: "Neuro", counter: 7 },
    { label: "Cancer", counter: 5 },
    { label: "Heart", counter: 3 },
    { label: "Other", counter: 8 },
    { label: "Respiratory", counter: 1 },
    { label: "Stroke", counter: 4 },
  ];
}
