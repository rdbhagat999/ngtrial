import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-inc-dec",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex justify-between items-stretch max-w-[200px] space-x-4">
      <button
        type="button"
        class="px-4 py-2 bg-gray-200 hover:bg-gray-100 active:bg-gray-400 dark:bg-gray-700 rounded border-[1px] border-gray-500"
        (click)="decrement()">
        <span class="bold text-xl">-</span>
      </button>

      <input
        id="minmax-range"
        class="bg-gray-50 text-black text-center rounded w-12 border-[1px] border-gray-500"
        type="text"
        [value]="counter"
        (change)="onChange($event)" />

      <button
        type="button"
        class="px-4 py-2 bg-gray-200 hover:bg-gray-100 active:bg-gray-400 dark:bg-gray-700 rounded border-[1px] border-gray-500"
        (click)="increment()">
        <span class="bold text-xl">+</span>
      </button>
    </div>
  `,
  styles: [],
})
export class IncDecComponent {
  @Input() step = 1;
  @Input() min = 1;
  @Input() max = 1;
  @Input() counter = 0;
  @Output() onChangeEvent = new EventEmitter<number>();

  increment() {
    this.counter = this.counter + this.step;
    this.onChangeEvent.emit(this.counter);
  }

  decrement() {
    this.counter = this.counter - this.step;
    this.onChangeEvent.emit(this.counter);
  }

  onChange(event: any) {
    this.counter = event.target.value;
    this.onChangeEvent.emit(event.target.value);
  }
}
