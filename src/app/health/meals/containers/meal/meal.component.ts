import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscriprion: Subscription;

  constructor(
    private _mealService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriprion = this._mealService.meals$.subscribe();

    this.meal$ = this.route.params.pipe(
      switchMap(param => this._mealService.getMeal(param.id))
    )
  }

  async addMeal(event: Meal) {
    await this._mealService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this._mealService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this._mealService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

  ngOnDestroy() {
    this.subscriprion.unsubscribe();
  }

}
