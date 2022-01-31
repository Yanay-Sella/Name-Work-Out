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
  constructor(name, amount, unit, div) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.div = div;
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
