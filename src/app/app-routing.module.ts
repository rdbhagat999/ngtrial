import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GaugeComponent } from "./gauge/gauge.component";

const routes: Routes = [
  {
    path: "",
    component: GaugeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
