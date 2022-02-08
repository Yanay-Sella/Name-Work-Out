import { findFood } from "./meal modules/foodMacros.js";
import * as modal from "./meal modules/modal.js";

let allPlans = [];

setupClickHandlers();
//~~~~~~~~~~~~~~Daily description scrolldown

function createPlan() {
  const planName = $(".dailyName").val();
  if (allPlans.find((p) => p.name === planName)) {
    alert(`can't use the same plan name twice`);
  } else {
    $(".modal").modal("show");
    $(".modal").attr(`planNum`, allPlans.length);
    $(".modal-title").text($(".dailyName").val());
    if ($(".mealDiv").length === 0) {
      modal.addMeal();
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
  if (allPlans.length === 0 && $(".openBtnDiv").hasClass("openBtnDivAfter")) {
    $(".openBtnDiv").removeClass("openBtnDivAfter");
    $(".header").html("Click + to add plans");
  }
}

function getCurPlanData(el) {
  const curPlanDiv = el.closest(".planData");
  const plansList = Array(...$(".planData"));
  const curPlanIndex = plansList.findIndex((p) => p === curPlanDiv);
  const curPlanData = allPlans[curPlanIndex];
  return curPlanData;
}

function setupClickHandlers() {
  //daily plan modal button
  $("#openModal").off("click").click(createPlan);
  //add meal to daily plan button
  $(".addMeal")
    .off("click")
    .click(() => modal.addMeal());

  //save daily changes button
  $(".savePlanBtn").off("click").click(modal.saveChanges);
  $(".closeModalBtn")
    .off("click")
    .click(() => modal.cleanModal());

  $(".planEditBtn").off("click").click(modal.editPlan);

  $(".add-dish") // add dish button
    .off("click")
    .click(modal.addDish);

  $(".delBtn").off("click").click(deleteDiv);

  $(".searchFood").off("click").click(findFood);

  $(".dishName").on("input", findFood);

  // $(".macros-dropdown-menu").off("click").click(renderMacros);
}

export { allPlans, setupClickHandlers, getCurPlanData };
