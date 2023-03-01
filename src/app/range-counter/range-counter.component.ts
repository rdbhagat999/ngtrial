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
      class="flex justify-evenly items-center my-4"
      *ngFor="let item of links">
      <app-range-input
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
    { label: "Neuro", counter: 75 },
    { label: "Cancer", counter: 50 },
    { label: "Heart", counter: 30 },
    { label: "Other", counter: 85 },
    { label: "Respiratory", counter: 15 },
    { label: "Stroke", counter: 45 },
  ];
}
