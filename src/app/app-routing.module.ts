import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GaugeComponent } from "./gauge/gauge.component";
import { IncDecComponent } from "./inc-dec/inc-dec.component";
import { RangeInputComponent } from "./range-input/range-input.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard",
  },
  {
    path: "gauge",
    component: GaugeComponent,
  },
  {
    path: "range",
    component: RangeInputComponent,
  },
  {
    path: "incdec",
    component: IncDecComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
