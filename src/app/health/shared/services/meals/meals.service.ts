import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';

export interface Meal {
  name: string,
  ingredients: string[],
  timesstamp: number,
  key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list<any>(`meals/${this.uid}`).snapshotChanges().pipe(
    map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))),
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

  getMeal(key) {
    if (!key) return of({})

    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map(meals => meals.find((meal: Meal) => meal.key === key))
    )
  }

  addMeal(meal: Meal) {
    return this.db.list<any>(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

}
