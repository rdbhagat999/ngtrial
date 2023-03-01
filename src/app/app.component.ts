import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <div class="mx-auto max-w-5xl">
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent {
  title = "ngtrial";
}
