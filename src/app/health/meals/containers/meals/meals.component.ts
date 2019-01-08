import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsService, Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscribtion: Subscription;

  constructor(private _mealsService: MealsService, private store: Store) { }

  ngOnInit() {
    this.subscribtion = this._mealsService.meals$.subscribe();
    this.meals$ = this.store.select('meals');
  }

  removeMeal(event: Meal) {
    this._mealsService.removeMeal(event.key);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
