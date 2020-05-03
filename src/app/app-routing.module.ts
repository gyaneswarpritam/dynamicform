import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { MultiDynamicComponent } from "./multi-dynamic/multi-dynamic.component";
import { NgModule } from "@angular/core";
import { DynamicFormsComponent } from "./dynamic-forms/dynamic-forms.component";

const routes: Routes = [
  { path: "", component: DynamicFormsComponent },
  { path: "multi", component: MultiDynamicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  appRoutes: Routes = [];
}
