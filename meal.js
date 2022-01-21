var meals = 0;

$("button").click(function(e){
    if($(this).is("#openModal")){ //if opening a new daily plan
        const title = $(".modal-title").text($(".dailyName").val());
        if(meals === 0){
            addMealPlan();
        }
    }
    if($(this).is("#addMeal")){ // if adding a meal
        addMealPlan();
    }
    // if($(this).hasClass("add-dish")){ // if adding a dish (not using id because its not unique)
    //     addDish.call(this);
    // }
});


let dishHtml =`
    <div class="container-fluid dishDiv input-group mb-3" id="dish">
        <label for="dishList" class="form-label"></label>
        <input class="form-control" list="datalistOptions" id="dishList" placeholder="Search dish...">
        <datalist id="datalistOptions">
            <option value="Tomato">
            <option value="Potato">
            <option value="Apple">
            <option value="Chicken Breast">
            <option value="Bread">
        </datalist>
        <input type="number" class="dish-amount form-control" placeholder="0.00">
        <input class="form-control" list="unitDataList" id="unitList" placeholder="unit">
        <datalist id="unitDataList">
            <option value="kg">
            <option value="grams">
            <option value="ml">
            <option value="liters">
            <option value="micrograms">
        </datalist>
    </div>
`;
let mealHtml = `
    <div class="container-fluid mealDiv">
        <input type="text" class="form-control mealName" placeholder="meal name" style="border: none">
        <button class="btn btn-primary add-dish">add dish</button>
        ${dishHtml}
    </div>
    `;

function addMealPlan(){
    meals++;
    const meal = $(mealHtml);
    meal.find(".mealName").val(`meal ${meals}`)
    $(".mealsContainer").append(meal);
    $(".add-dish").off("click").click(function(){ //detecting a click for one button!
        addDish(this);
    });
}
function addDish(button){

    button.closest(".mealDiv").insertAdjacentHTML("beforeend",dishHtml); // adding the dishDiv html
}

// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })