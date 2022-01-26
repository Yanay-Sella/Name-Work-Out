import { Plan, Meal, Dish, Macros } from "./meal modules/classes.js";
import {
  mealHtml,
  mealDataHtml,
  dishHtml,
  dishDataHtml,
  planDataHtml,
} from "./meal modules/htmlTemplates.js";
import { createPlanDiv } from "./meal modules/divCreation.js";

let meals = 0;
let allPlans = [];

//daily plan modal button
$("#openModal").click(function (e) {
  const title = $(".modal-title").text($(".dailyName").val());
  if (meals === 0) {
    addMealPlan();
  }
});

//add meal to daily plan button
$("#addMeal").click(function (e) {
  addMealPlan();
});

//save daily changes button
$(".savePlanBtn").click(function (e) {
  saveChanges();
});

//~~~~~~~~~~~~~~Daily description scrolldown

function addMealPlan() {
  meals++;
  const meal = $(mealHtml);
  meal.find(".mealName").val(`meal ${meals}`);
  $(".mealsContainer").append(meal);
  $(".add-dish") // add dish button
    .off("click")
    .click(function () {
      addDish(this);
    });
}

function addDish(button) {
  button.closest(".mealDiv").insertAdjacentHTML("beforeend", dishHtml); // adding the dishDiv html
}

function saveChanges() {
  let planName = $(".modal-title").text();
  const allMealsDivs = $(".mealDiv"); //this is an array
  const allMeals = allMealsDivs.map((_, mealDiv) => {
    return new Meal(
      $(mealDiv).find(".mealName").val(),
      dishDivArrToDataDishArr($(mealDiv).find(".dishDiv"))
    );
  });
  allPlans.push(new Plan(planName, "", allMeals, allPlans.length + 1));
  createPlanData();
  $("#mealModal").modal("hide");
  setTimeout(() => {
    meals = 0;
    $(".mealsContainer").html("");
  }, 130);
}

function dishDivArrToDataDishArr(divArr) {
  return divArr.map(
    (_, div) =>
      new Dish(
        $(div).find(".dishName").val(),
        $(div).find(".dishAmount").val(),
        $(div).find(".dishUnit").val()
      )
  );
}

function createPlanData() {
  allPlans.forEach((plan) => {
    if (plan.placeNumber >= allPlans.length) {
      console.log(plan.placeNumber);
      $(".allPlansContainer").append(createPlanDiv(plan));
    }
  });
}

export { allPlans };
