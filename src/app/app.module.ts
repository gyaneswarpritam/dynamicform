import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DynamicFormsComponent } from "./dynamic-forms/dynamic-forms.component";
import { MultiDynamicComponent } from "./multi-dynamic/multi-dynamic.component";

@NgModule({
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [AppComponent, DynamicFormsComponent, MultiDynamicComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
