import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._authService.getAuthState.pipe(
            map((user) => {
                if (!user) {
                    this.router.navigate(['/auth/login']);
                }
                return !!user;
            })
        )
    }
}