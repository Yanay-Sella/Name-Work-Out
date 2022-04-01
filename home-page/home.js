$("button").click(function () {
  if ($(this).is("#workout-button")) {
    window.location.href = "workout-plan/index.html"; // to workout page
  }
  if ($(this).is("#meal-button")) {
    window.location.href = "meal-plan/MealPlan.html"; // to meal page
  }
});
