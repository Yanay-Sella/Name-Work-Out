var meals = 0;
$("button").click(function(e){
    
    if($(this).is("#openModal")){ //if opening a new daily plan
        addMealPlan.call($(".modal-body"));
    }
    if($(this).is("#addMeal")){ // if adding a meal
        addMealPlan.call($("#modalBody"));
    }
});

let mealHtml = `
    <div class="container-fluid mealDiv">
        <button class="btn btn-primary add-dish">add dish</button>
    </div>
`;

let dishHtml = `
    <div class="container-fluid dishDiv" id="dish">
    <label for="dishList" class="form-label"></label>
    <input class="form-control" list="datalistOptions" id="dishList" placeholder="Type to search...">
    <datalist id="datalistOptions">
        <option value="Tomato">
        <option value="Potato">
        <option value="Apple">
        <option value="Chicken Breast">
        <option value="Bread">
    </datalist>
    </div>
`;

function addMealPlan(){
    meals++; // adding a meal
    console.log(meals);
    $(this).append(mealHtml); // adding the html
    $(".add-dish").addClass("meal-"+meals);
    $(".mealDiv").addClass("mealDiv-"+meals);
    $("button").click(function(e){ //listening to buttons
        for(var i=1;i<=meals;i++){
            if($(this).hasClass("add-dish") && $(this).hasClass("meal-"+i)){ // if adding a dish (not using id because its not unique)
                addDish.call($(".mealDiv-"+meals));
            }
        }
    });
}
function addDish(){
    $(this).append(dishHtml);
}

// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })