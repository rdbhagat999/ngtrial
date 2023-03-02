import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-range-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="min-w-xs w-full flex flex-col lg:flex-row justify-around items-center space-4 p-4">
      <label
        for="minmax-range"
        class="inline-block text-sm font-medium text-gray-900 dark:text-white mr-4 mb-4 lg:mb-0"
        >{{ rangeLabel }}</label
      >
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="10"
        [value]="counter"
        (change)="onChange($event)"
        class="md:max-w-[250px] w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
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
  @Input() counter = 5;
  @Output() onChangeEvent = new EventEmitter<number>();

  onChange(event: any) {
    this.counter = parseInt(event.target.value);
    this.onChangeEvent.emit(this.counter);
  }
}
