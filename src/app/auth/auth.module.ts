import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// firebase
import { AngularFireModule, FirebaseAppConfig } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

//shared module
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
      },
      { path: "login", loadChildren: "./login/login.module#LoginModule" },
      {
        path: "register",
        loadChildren: "./register/register.module#RegisterModule"
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCMlwFmfbE69ihFp9DlYIWlKEHFGSbJGzE",
  authDomain: "fitness-app-6c2ee.firebaseapp.com",
  databaseURL: "https://fitness-app-6c2ee.firebaseio.com",
  projectId: "fitness-app-6c2ee",
  storageBucket: "fitness-app-6c2ee.appspot.com",
  messagingSenderId: "466806016849"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class AuthModule { }
