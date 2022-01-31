import * as classes from "./meal modules/classes.js";
import * as templates from "./meal modules/htmlTemplates.js";
import { createPlanDiv } from "./meal modules/divCreation.js";

let allPlans = [];

setupClickHandlers();
//~~~~~~~~~~~~~~Daily description scrolldown

function addMeal(name, dishes = []) {
  const meal = $(templates.mealHtml);

  if (dishes.length > 0) dishes.forEach((dish) => addDish.call(meal, dish));
  else addDish.call(meal);

  $(".mealsContainer").append(meal);
  console.log(name);
  if (name === undefined) {
    name = `meal ${$(".mealDiv").length}`;
  }
  meal.find(".mealName").val(name);

  setupClickHandlers();
}

function addDish(dish = new classes.Dish()) {
  const dishDiv = $(templates.dishHtml);

  dishDiv.find(".dishName").val(dish.name);
  dishDiv.find(".dishAmount").val(dish.amount);
  dishDiv.find(".dishUnit").val(dish.unit);

  $(this).closest(".mealDiv").append(dishDiv); // adding the dishDiv html
}

function saveChanges() {
  let planName = $(".modal-title").text();
  const allMealsDivs = $(".mealDiv"); //this is an array
  const allMeals = allMealsDivs.map((_, mealDiv) => {
    return new classes.Meal(
      $(mealDiv).find(".mealName").val(),
      dishDivArrToDataDishArr($(mealDiv).find(".dishDiv")),
      mealDiv
    );
  });

  const curPlan = allPlans.find((pName) => pName.name === planName);
  if (!curPlan) {
    allPlans.push(
      new classes.Plan(
        planName,
        "",
        allMeals,
        allPlans.length + 1,
        $(".mealDiv")
      )
    );
  } else {
    curPlan.name = planName;
    curPlan.meals = allMeals;
    curPlan.div = $(".mealDiv");
    allPlans[allPlans.findIndex((p) => p === curPlan)] = curPlan;
  }
  updatePlans();
  $("#mealModal").modal("hide");
  cleanModal(); // cleaning the modal

  $(".dailyName").val("");
}

function dishDivArrToDataDishArr(divArr) {
  return divArr.map(
    (_, div) =>
      new classes.Dish(
        $(div).find(".dishName").val(),
        $(div).find(".dishAmount").val(),
        $(div).find(".dishUnit").val(),
        div
      )
  );
}

function updatePlans() {
  const plans = $(".planData");
  plans.each((_, p) => p.remove());

  allPlans.forEach((plan) => {
    $(".allPlansContainer").append(createPlanDiv(plan));
  });
  setupClickHandlers();
}

//cleans the modal to use when closing/saving the modal
function cleanModal(){
  setTimeout(() => {
    $(".mealsContainer").html("");
  }, 130);
}

function editPlan() {
  const planData = getCurPlanData(this);
  $("#mealModal").modal("toggle");
  $(".mealDiv").each((_, m) => m.remove());
  $(".modal-title").text(planData.name);
  $("#mealModal").find(".mealsContainer").append(planData.div);
  setupClickHandlers();
  // Array(...planData.meals).forEach((meal) =>
  //   addMeal(meal.name, Array(...meal.dishes))
  // );
}

function getCurPlanData(el) {
  const curPlanDiv = el.closest(".planData");
  console.log(curPlanDiv);
  const plansList = Array(...$(".planData"));
  const curPlanIndex = plansList.findIndex((p) => p === curPlanDiv);
  const curPlanData = allPlans[curPlanIndex];
  return curPlanData;
}

function createPlan() {
  const planName = $(".dailyName").val();
  if (allPlans.find((p) => p.name === planName)) {
    alert(`can't use the same plan name twice`);
  } else {
    console.log(planName);
    $(".modal").modal("show");
    $(".modal-title").text($(".dailyName").val());
    if ($(".mealDiv").length === 0) {
      addMeal();
    }
  }
}

function setupClickHandlers() {
  //daily plan modal button
  $("#openModal").off("click").click(createPlan);
  //add meal to daily plan button
  $(".addMeal")
    .off("click")
    .click(() => addMeal());

  //save daily changes button
  $(".savePlanBtn").off("click").click(saveChanges);
  $(".closeModalBtn").off("click").click(()=>cleanModal());

  $(".planEditBtn").off("click").click(editPlan);

  $(".add-dish") // add dish button
    .off("click")
    .click(addDish);
}
export { allPlans };
