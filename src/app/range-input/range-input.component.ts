import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-range-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-w-xs flex justify-around items-center space-x-4">
      <label
        for="minmax-range"
        class="min-w-[100px] inline-block text-sm font-medium text-gray-900 dark:text-white"
        >{{ rangeLabel }} {{ counter }}</label
      >
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="100"
        [value]="counter"
        (change)="onChange($event)"
        class="w-52 h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
    </div>
  `,
  styles: [
    `
      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgb(30 58 138);
        /* background: rgb(30 64 175); */
        cursor: pointer;
      }
    `,
  ],
})
export class RangeInputComponent {
  @Input() rangeLabel: string = "Default";
  @Input() counter = 50;
  @Output() onChangeEvent = new EventEmitter<number>();

  onChange(event: any) {
    this.counter = event.target.value;
    this.onChangeEvent.emit(event.target.value);
  }
}
