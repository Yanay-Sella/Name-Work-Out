class Plan {
  constructor(name, macros, meals, placeNumber = 0, div) {
    this.name = name;
    this.macros = macros;
    this.date = new Date();
    this.meals = meals; //array
    this.placeNumber = placeNumber;
    this.div = div;
  }
}

class Meal {
  constructor(name, dishes, div) {
    this.name = name;
    this.dishes = dishes; //array
    this.div = div;
  }
}

class Dish {
  constructor(name, amount, unit, div, macros) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.div = div;
    this.macros = macros;
  }
}

class Macros {
  constructor(calories, protein, carbs, dishDiv) {
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.dishDiv = dishDiv;
  }

  calcMacros() {
    const amount = this.dishDiv.find(".dishAmount").val();
    const unit = this.dishDiv.find(".dishUnit").val();

    if (!amount || !unit) return this;

    if (unit == "kg" || unit == "liters") {
      this.calories *= amount * 10;
      this.protein *= amount * 10;
      this.carbs *= amount * 10;
    }

    if (unit == "grams" || unit == "ml") {
      this.calories *= amount / 100;
      this.protein *= amount / 100;
      this.carbs *= amount / 100;
    }

    this.calories = Math.round(this.calories);
    this.protein = Math.round(this.protein);
    this.carbs = Math.round(this.carbs);

    return this;
  }

  getMacrosFromFoodItem(food) {
    console.log(food);

    (this.calories =
      food.foodNutrients.find((n) => n.nutrientName.includes("Energy")).value ??
      0),
      (this.protein =
        food.foodNutrients.find((n) => n.nutrientName.includes("Protein"))
          .value ?? 0),
      (this.carbs =
        food.foodNutrients.find((n) => n.nutrientName.includes("Carbohydrate"))
          ?.value ?? 0);

    return this;
  }
}

export { Plan, Meal, Dish, Macros };
