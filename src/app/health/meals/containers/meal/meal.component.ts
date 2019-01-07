import { Component, OnInit } from '@angular/core';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor(private _mealService: MealsService, private router: Router) { }

  ngOnInit() {
  }

  async addMeal(event: Meal) {
    await this._mealService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

}
