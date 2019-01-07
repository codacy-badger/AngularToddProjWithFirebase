import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';

export interface Meal {
  name: string,
  ingradients: string[],
  timesstamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list<any>(`meals/${this.uid}`).valueChanges().pipe(
    tap(next => this.store.set('meals', next))
  )

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list<any>(`meals/${this.uid}`).push(meal);
  }

}
