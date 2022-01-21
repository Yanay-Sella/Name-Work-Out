$("button").click(function(e){
    if($(this).is("#openModal")){ //if opening a new daily plan
        addMealPlan();
    }
    if($(this).is("#addMeal")){ // if adding a meal
        addMealPlan();
    }
    // if($(this).hasClass("add-dish")){ // if adding a dish (not using id because its not unique)
    //     addDish.call(this);
    // }
});



let mealHtml = `
    <div class="container-fluid mealDiv">
        <button class="btn btn-primary add-dish">add dish</button>
    </div>
`;

let dishHtml =`
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
    $(".modal-body").prepend(mealHtml);

    $(".add-dish").click(function(e){
        addDish(this);
    });
}
function addDish(button){
    // $(this).append(dishHtml);
    // this.closest(".mealDiv").append(dishDiv);
    button.closest(".mealDiv").insertAdjacentHTML("beforeend",dishHtml); // adding the dishDiv html
}

// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })