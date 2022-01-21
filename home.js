$("button").click(function(){
    if($(this).is("#workout-button")){
        window.location.href = "index.html"; // to workout page
    }
    if($(this).is('#meal-button')){
        window.location.href = "MealPlan.html" // to meal page
    }
});