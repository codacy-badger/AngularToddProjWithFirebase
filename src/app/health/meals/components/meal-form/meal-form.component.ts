import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MealFormComponent implements OnInit, OnChanges {

  toggled = false;
  exists = false;

  @Input() meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

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

  removeMeal() {
    this.remove.emit(this.form.value)
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value)
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.meal.currentValue.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }
}
