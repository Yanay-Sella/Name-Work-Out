import {
  mealHtml,
  mealDataHtml,
  dishHtml,
  dishDataHtml,
  planDataHtml,
} from "./htmlTemplates.js";
import { allPlans } from "../meal.js";

const createPlanDiv = function (plan) {
  const name = plan.name;
  const meals = plan.meals.map((_, meal) => createMealDiv(meal)); //array

  const planDataElement = $(planDataHtml);
  if (name === "") {
    planDataElement
      .find(".planDataName")
      .find("p")
      .html("Daily plan #" + Number(allPlans.length));
  } else {
    planDataElement.find(".planDataName").html(name);
  }

  planDataElement
    .find(".collapseB")
    .attr("data-bs-target", `.collapse${plan.placeNumber}`);
  planDataElement.find(".collapse").addClass(`collapse${plan.placeNumber}`);

  // appending each mealDiv in the meals array to plandatabody and setting classes for colors
  Array(...meals).forEach((mealDiv, i) => {
    planDataElement.find(".planDataBody").append(mealDiv);
    if (i % 2 === 0) {
      if (i === 0) {
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDarkFirst");
      }
      if (i === meals.length - 1) {
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDarkLast");
      } else {
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDark");
      }
    }
  });
  return planDataElement;
};

const createMealDiv = function (meal) {
  const name = meal.name;
  const dishes = meal.dishes.map((_, dish) => $(createDishDiv(dish)));
  const mealDataElement = $(mealDataHtml); //class mealData
  mealDataElement.find(".mealDataName").html(name);
  Array(...dishes).forEach((dishDiv) => {
    mealDataElement.find(".mealTable").append(dishDiv);
  });
  return mealDataElement;
};

const createDishDiv = function (dish) {
  const name = dish.name;
  const amount = dish.amount;
  const unit = dish.unit;

  const dishDataElement = $(dishDataHtml);
  dishDataElement.find(".dishDataName").html(name);
  dishDataElement.find(".dishDataAmountUnit").html(`${amount} ${unit}`);

  return dishDataElement;
};

export { createPlanDiv };
