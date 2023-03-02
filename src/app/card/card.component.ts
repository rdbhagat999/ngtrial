import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="max-w-sm p-4 my-4 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition-all ease-linear md:hover:scale-105">
      <h2
        class="mb-2 active:text-2xl font-semibold active:font-bold tracking-tight text-gray-700 dark:text-white capitalize">
        {{ item.title }}
      </h2>

      <section>
        <h3
          class="text-sm font-semibold tracking-wider text-gray-500 dark:text-white capitalize">
          {{ item.current.label }}
        </h3>

        <p class="mb-2 font-normal text-green-700 dark:text-gray-400">
          {{ item.current.price | currency : "USD" : "symbol" : "4.0-0" }}
        </p>
      </section>

      <section>
        <h3
          class="text-sm font-semibold tracking-wider text-gray-500 dark:text-white capitalize">
          {{ item.adjusted.label }}
        </h3>

        <p class="mb-2 font-semibold text-green-600 dark:text-gray-400 text-xl">
          {{ item.adjusted.price | currency : "USD" : "symbol" : "4.0-0" }}
        </p>
      </section>
    </article>
  `,
  styles: [],
})
export class CardComponent {
  @Input() item!: any;
}
