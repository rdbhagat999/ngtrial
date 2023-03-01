import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <div class="mx-auto container">
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent {
  title = "ngtrial";
}
