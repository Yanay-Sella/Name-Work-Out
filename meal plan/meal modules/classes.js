class Plan {
  constructor(name, macros, meals, placeNumber = 0) {
    this.name = name;
    this.macros = macros;
    this.date = new Date();
    this.meals = meals; //array
    this.placeNumber = placeNumber;
  }
}

class Meal {
  constructor(name, dishes) {
    this.name = name;
    this.dishes = dishes; //array
  }
}

class Dish {
  constructor(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}

class Macros {
  constructor(calories, protien, carbs, fats) {
    this.calories = calories;
    this.protien = protien;
    this.carbs = carbs;
    this.fats = fats;
  }
}

export { Plan, Meal, Dish, Macros };
