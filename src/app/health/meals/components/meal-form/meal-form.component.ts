import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MealFormComponent implements OnInit {

  @Output()
  create = new EventEmitter<Meal>();

  form: FormGroup = this._fb.group({
    name: ['', Validators.required],
    ingredients: this._fb.array([''])
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value)
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
