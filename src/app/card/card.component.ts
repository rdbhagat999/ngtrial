import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="cursor-pointer max-w-3xl p-4 my-4 bg-white border border-gray-300 hover:border-green-700 group rounded-lg dark:bg-gray-800 dark:border-gray-700 transition-all ease-linear md:hover:scale-105">
      <ng-container *ngIf="item.isCapacity">
        <section class="space-y-2">
          <div
            *ngFor="let c of item.capacity; let first = first; let last = last">
            <h3
              class="text-sm font-semibold tracking-wider text-gray-500 dark:text-white capitalize">
              {{ c.title }}
            </h3>

            <p
              [ngClass]="{
                'mb-2 font-semibold text-green-600 dark:text-gray-400 text-xl':
                  first,
                'mb-2 font-normal text-green-700 dark:text-gray-400': last
              }">
              {{ c.capacity }}
            </p>
          </div>
        </section>
      </ng-container>

      <ng-container *ngIf="!item.isCapacity">
        <h2
          class="mb-2 font-semibold tracking-tight group-hover:text-lg group-hover:font-bold group-hover:text-gray-700 dark:text-white capitalize">
          {{ item.title }}
        </h2>

        <section>
          <h3
            class="text-sm font-semibold tracking-wider text-gray-500 dark:text-white capitalize">
            {{ item.current.label }}
          </h3>

          <p class="mb-2 font-normal text-green-700 dark:text-gray-400">
            {{ item.current.price | currency : "USD" : "symbol" : "2.0-0" }}
          </p>
        </section>

        <section>
          <h3
            class="text-sm font-semibold tracking-wider text-gray-500 dark:text-white capitalize">
            {{ item.adjusted.label }}
          </h3>

          <p
            class="mb-2 font-semibold text-green-600 dark:text-gray-400 text-xl">
            {{ item.adjusted.price | currency : "USD" : "symbol" : "2.0-0" }}
          </p>
        </section>
      </ng-container>
    </article>
  `,
  styles: [],
})
export class CardComponent {
  @Input() item!: any;
}
