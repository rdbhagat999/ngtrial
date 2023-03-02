import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <main class="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <router-outlet></router-outlet>
    </div>
  </main>`,
  styles: [],
})
export class AppComponent {
  title = "ngtrial";
}
