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

  $(this).closest(".mealDiv").find(".add-dish").before(dishDiv); // adding the dishDiv html
  setupClickHandlers();
}

function saveChanges() {
  let planName = $(".modal-title").val();
  const allMealsDivs = $(".mealDiv"); //this is an array
  const allMeals = allMealsDivs.map((_, mealDiv) => {
    return new classes.Meal(
      $(mealDiv).find(".mealName").val(),
      dishDivArrToDataDishArr($(mealDiv).find(".dishDiv")),
      mealDiv
    );
  });
  const placeNumber = $(".modal").attr(`class`).search("planNumber-") + 11;
  const index = $(".modal")
    .attr(`class`)
    .slice(placeNumber, placeNumber + 1);
  console.log(index);
  const curPlan = allPlans[index];
  console.log(curPlan);
  if (!curPlan) {
    allPlans.push(
      new classes.Plan(planName, "", allMeals, allPlans.length, $(".mealDiv"))
    );
  } else {
    curPlan.name = planName;
    curPlan.meals = allMeals;
    curPlan.div = $(".mealDiv");
    allPlans[allPlans.findIndex((p) => p === curPlan)] = curPlan;
  }
  updatePlans();
  $(".modal").removeClass(`planNumber-${index}`);
  $(".modal-title").val("");
  $("#mealModal").modal("hide");
  cleanModal(); // cleaning the modal
  if (allPlans.length === 1) {
    $(".header").html("Name Workout");
    $(".openBtnDiv").addClass("openBtnDivAfter");
  }
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
function cleanModal() {
  setTimeout(() => {
    $(".mealsContainer").html("");
  }, 130);
}

function editPlan() {
  const planData = getCurPlanData(this);
  $("#mealModal").modal("toggle");
  $(".modal").addClass(`planNumber-${planData.placeNumber}`);
  $(".mealDiv").each((_, m) => m.remove());
  $(".modal-title").val(planData.name);
  $("#mealModal").find(".mealsContainer").append(planData.div);
  setupClickHandlers();
  // Array(...planData.meals).forEach((meal) =>
  //   addMeal(meal.name, Array(...meal.dishes))
  // );
}

function getCurPlanData(el) {
  const curPlanDiv = el.closest(".planData");
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
    $(".modal").modal("show");
    $(".modal").addClass(`planNumber-${allPlans.length}`);
    $(".modal-title").text($(".dailyName").val());
    if ($(".mealDiv").length === 0) {
      addMeal();
    }
  }
}

function deleteDiv() {
  if (this.classList.contains("delMeal")) this.closest(".mealDiv").remove();
  if (this.classList.contains("delDish")) this.closest(".dishDiv").remove();
  if (this.classList.contains("delPlan")) {
    deletePlan(this);
  }
  setupClickHandlers();
}

function deletePlan(planDiv) {
  const plan = getCurPlanData(planDiv);
  planDiv.closest(".planData").remove();
  allPlans.splice(
    allPlans.findIndex((p) => p === plan),
    1
  );
  console.log(allPlans);
  if (allPlans.length === 0 && $(".openBtnDiv").hasClass("openBtnDivAfter")) {
    $(".openBtnDiv").removeClass("openBtnDivAfter");
    $(".header").html("Click + to add plans");
  }
}

const API_KEY = "b1oBKkfsRfpbbbIZFfVrN7m5q9jhK6mdvyL4010F";

async function getFoodByName(des) {
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${des}`
  );
  const data = await req.json();
  return data;
}

async function getFoodByfdcId(id) {
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/${id}?api_key=${API_KEY}`
  );
  const data = await req.json();
  return data;
}

async function getFoods(des) {
  const data = await getFoodByName(des);
  const foods = data.foods;
  const name = foods[0].description;
  // const macros = food.foodNutrients;
  return {
    name,
    foods,
  };
}

function cleanArray(arr) {
  return [...new Set(arr)];
}

async function findFood() {
  const dishDiv = $(this).closest(".dishDiv");
  const dropdownMenu = dishDiv.find(".food-dropdown-menu");
  const nameInput = dishDiv.find(".dishName");
  const query = nameInput.val().toString();
  const searchFinds = await getFoods(query);
  console.log(searchFinds);
  const foodsDes = cleanArray(searchFinds.foods.map((f) => f.description));

  dropdownMenu.empty();
  foodsDes.forEach((f, i) => {
    const foodDiv = $(
      `<li><a class="dropdown-item" href="#${searchFinds.foods[i].fdcId}">${f}</a></li>`
    );
    dropdownMenu.append(foodDiv);
    foodDiv.click((e) => {
      selectFood(e, nameInput);
    });
  });
}

function selectFood(e, input) {
  const el = $(e.target);
  console.log(el.attr("href"));
  input.attr("data-fdcid", el.attr("href").slice(1));
  input.val(el.html());
}

async function renderMacros() {
  const dishDiv = $(this).closest(".dishDiv");
  const foodId = dishDiv.find(".dishName").attr("data-fdcid");
  console.log(foodId);
  console.log(await getFoodByfdcId(foodId));
}

// getFoodMacros("honey").then((v) => console.log(v));

function setupClickHandlers() {
  //daily plan modal button
  $("#openModal").off("click").click(createPlan);
  //add meal to daily plan button
  $(".addMeal")
    .off("click")
    .click(() => addMeal());

  //save daily changes button
  $(".savePlanBtn").off("click").click(saveChanges);
  $(".closeModalBtn")
    .off("click")
    .click(() => cleanModal());

  $(".planEditBtn").off("click").click(editPlan);

  $(".add-dish") // add dish button
    .off("click")
    .click(addDish);

  $(".delBtn").off("click").click(deleteDiv);

  $(".searchFood").off("click").click(findFood);

  $(".macros-dropdown-menu").off("click").click(renderMacros);
}

export { allPlans };
