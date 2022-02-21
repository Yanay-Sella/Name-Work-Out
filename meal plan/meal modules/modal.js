import * as templates from "./htmlTemplates.js";
import { setupClickHandlers, allPlans, getCurPlanData } from "../meal.js";
import * as classes from "./classes.js";
import * as divCreation from "./divCreation.js";

export function saveChanges() {
  const index = $(".modal").attr(`planNum`);
  const curPlan = allPlans[index];

  createPlanFromModal(curPlan, index);
  updatePlans();
  closeModalAfterSave(index);
  console.log(allPlans);
}

function createPlanFromModal(curPlan, index) {
  let planName = $(".modal-title").val();
  const allMealsDivs = $(".mealDiv"); //this is an array
  const allMeals = allMealsDivs.map((_, mealDiv) => {
    return new classes.Meal(
      $(mealDiv).find(".mealName").val(),
      createDishArr($(mealDiv).find(".dishDiv")),
      mealDiv
    );
  });

  const planMacros = savePlanMacros();

  const newPlan = new classes.Plan(
    planName,
    planMacros,
    allMeals,
    $(".modal").attr("planNum"),
    $(".mealDiv")
  );

  if (!curPlan) allPlans.push(newPlan);
  else allPlans[index] = newPlan;
}

function closeModalAfterSave(index) {
  $(".modal").removeClass(`planNumber-${index}`);
  $(".modal-title").val("");
  $("#mealModal").modal("hide");
  cleanModal(); // cleaning the modal
  if (allPlans.length === 1) {
    $(".header").html("Name Workout");
    $(".openBtnDiv").addClass("openBtnDivAfter");
  }
}

function savePlanMacros() {
  return {
    calories: Number(
      $(".plan-dropdown-cal")
        .html()
        .slice($(".plan-dropdown-cal").html().indexOf(": ") + 2)
    ),
    protein: Number(
      $(".plan-dropdown-prot")
        .html()
        .slice($(".plan-dropdown-prot").html().indexOf(": ") + 2)
    ),
    carbs: Number(
      $(".plan-dropdown-carbs")
        .html()
        .slice($(".plan-dropdown-carbs").html().indexOf(": ") + 2)
    ),
  };
}

export function cleanModal() {
  setTimeout(() => {
    $(".mealsContainer").html("");
  }, 130);
}

function createDishArr(divArr) {
  return divArr.map(
    (_, div) =>
      new classes.Dish(
        $(div).find(".dishName").val(),
        $(div).find(".dishAmount").val(),
        $(div).find(".dishUnit").val(),
        div,
        divArr.find()
      )
  );
}

function updatePlans() {
  const plans = $(".planData");
  plans.each((_, p) => p.remove());

  allPlans.forEach((plan) => {
    $(".allPlansContainer").find(".openBtnContainer").before(divCreation.createPlanDiv(plan));
    // $(".openBtnDiv").before(divCreation.createPlanDiv(plan));
  });
  setupClickHandlers();
}

export function addMeal(name, dishes = []) {
  const meal = $(templates.mealHtml);

  if (dishes.length > 0) dishes.forEach((dish) => addDish.call(meal, dish));
  else addDish.call(meal);

  $(".mealsContainer").append(meal);
  if (name === undefined) {
    name = `meal ${$(".mealDiv").length}`;
  }
  meal.find(".mealName").val(name);

  setupClickHandlers();
}

export function addDish(dish = new classes.Dish()) {
  const dishDiv = $(templates.dishHtml);

  dishDiv.find(".dishName").val(dish.name);
  dishDiv.find(".dishAmount").val(dish.amount);
  dishDiv.find(".dishUnit").val(dish.unit);

  $(this).closest(".mealDiv").find(".add-dish").before(dishDiv); // adding the dishDiv html
  setupClickHandlers();
}

export function editPlan() {
  const planData = getCurPlanData(this);
  $("#mealModal").modal("toggle");
  $(".modal").attr(`planNum`, planData.placeNumber);
  $(".mealDiv").each((_, m) => m.remove());
  $(".modal-title").val(planData.name);
  $("#mealModal").find(".mealsContainer").append(planData.div);
  setupClickHandlers();
  // Array(...planData.meals).forEach((meal) =>
  //   addMeal(meal.name, Array(...meal.dishes))
  // );
}
