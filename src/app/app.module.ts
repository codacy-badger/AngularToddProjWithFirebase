import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { Store } from "store";

//feature module
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from './health/health.module';


//containers

//components
import { HeaderComponent } from './layout/components/header/header.component';
import { NavComponent } from './layout/components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }

