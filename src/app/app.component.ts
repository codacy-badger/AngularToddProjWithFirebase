import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private _authSrvice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this._authSrvice.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  async onLogout() {
    await this._authSrvice.logoutUser();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
