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

  planDataElement
    .find(".collapseB")
    .attr("data-bs-target", `.collapse${plan.placeNumber}`);

  setPlanNameDate(planDataElement, plan, name);

  planDataElement.find(".collapse").addClass(`collapse${plan.placeNumber}`);
  // appending each mealDiv in the meals array to plandatabody and setting classes for colors
  setMealColor(planDataElement, meals);
  displayPlanMacros(planDataElement, plan.macros);

  return planDataElement;
};

function setPlanNameDate(planDiv, plan, name) {
  if (name === "") {
    planDiv.find(".planDataName").find("p").html("Nameless plan...");
  } else {
    planDiv.find(".planDataName").find("p").html(name);
  }

  planDiv
    .find(".planDataDate")
    .find("p")
    .text(plan.date.toLocaleDateString("en-GB"));
}

function setMealColor(planDiv, meals) {
  meals.each((i, mealDiv) => {
    planDiv.find(".planDataBody").append(mealDiv);
    // if (i % 2 === 0) {
    //   if (i === 0) {
    //     $(planDiv.find(".mealData")[i]).addClass("mealDataDarkFirst");
    //   }
    //   if (i === meals.length - 1) {
    //     $(planDiv.find(".mealData")[i]).addClass("mealDataDarkLast");
    //   } else {
    //     $(planDiv.find(".mealData")[i]).addClass("mealDataDark");
    //   }
    // }
  });
}

function displayPlanMacros(planDiv, macros) {
  planDiv.find(".plan-dropdown-cal").text(`Calories: ${macros.calories}`);
  planDiv.find(".plan-dropdown-prot").text(`protein: ${macros.protein}`);
  planDiv.find(".plan-dropdown-carbs").text(`Carbs: ${macros.carbs}`);
}

const createMealDiv = function (meal) {
  const name = meal.name;
  const dishes = meal.dishes.map((_, dish) => $(createDishDiv(dish)));
  const mealDataElement = $(mealDataHtml); //class mealData
  mealDataElement.find(".mealDataName").html(name);
  dishes.each((_, dishDiv) => {
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
