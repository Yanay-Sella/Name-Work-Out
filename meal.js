var meals = 0;

let allPlans = [];

class Plan {
  constructor(name, macros, meals) {
    this.name = name;
    this.macros = macros;
    this.date = new Date();
    this.meals = meals; //array
  }
}

class Meal {
  constructor(name, dishes) {
    this.name = name;
    this.dishes = dishes; //array
  }
}

class Dish {
  constructor(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}

class Macros {
  constructor(calories, protien, carbs, fats) {
    this.calories = calories;
    this.protien = protien;
    this.carbs = carbs;
    this.fats = fats;
  }
}

//daily plan modal button
$("#openModal").click(function(e){
  const title = $(".modal-title").text($(".dailyName").val());
  if (meals === 0) {
    addMealPlan();
  }
});

//add meal to daily plan button
$("#addMeal").click(function(e){
  addMealPlan();
});

//save daily changes button
$(".savePlanBtn").click(function (e) {
    saveChanges();
});

//~~~~~~~~Dish Div
let dishHtml = `
    <div class="container-fluid dishDiv input-group mb-3" id="dish">
        <label for="dishList" class="form-label"></label>
        <input class="form-control dishName" list="datalistOptions" id="dishList" placeholder="Search dish...">
        <datalist id="datalistOptions">
            <option value="Tomato">
            <option value="Potato">
            <option value="Apple">
            <option value="Chicken Breast">
            <option value="Bread">
        </datalist>
        <input type="number" class="dishAmount form-control" placeholder="0.00">
        <input class="form-control dishUnit" list="unitDataList" id="unitList" placeholder="unit">
        <datalist id="unitDataList">
            <option value="kg">
            <option value="grams">
            <option value="ml">
            <option value="liters">
            <option value="micrograms">
        </datalist>
    </div>
`;
//~~~~~~~~Dish Div

//~~~~~~~~Meal Div
let mealHtml = `
    <div class="container-fluid mealDiv">
        <input type="text" class="form-control mealName" placeholder="meal name" style="border: none">
        <button class="btn btn-primary add-dish">add dish</button>
        ${dishHtml}
    </div>
    `;
//~~~~~~~~Meal Div

//~~~~~~~~~~~~~~Daily description scrolldown
let planDataHtml = `
<div class="container-fluid planData">
      <div class="row container-fluid planDataHeader">
        <div class="col-3 planDataName desTitle">name</div>
        <div class="col-3 planDataMacros desTitle">macros</div>
        <div class="col-3 planDataDate desTitle">date</div>
        <div class="col-3 desTitle">
          <button
            class="btn btn-dark collapseB"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDes"
            aria-expanded="false"
            aria-controls="collapseDes"
          >
            open/close
          </button>
          <button
              class="btn btn-dark"
              style="width: auto; float: right;"
          >
              edit
          </button>
        </div>
        <div class="collapse" id="collapseDes">
            <div class="container-fluid planDataBody" style="padding: 0;">
              
            </div>
        </div>
        
      </div>
      
    </div>`;

let mealDataHtml = `
            <div>
              <h2 class="text-center mealDataName">meal name</h2>
              <table class="table table-striped">
                <tbody class="mealData">

                </tbody>
              </table>
            </div>
`;

let dishDataHtml = `
              
                <tr class="dishData">
                  <td>
                    <div class="dishDataName p-3 dishDes">
                      dish name
                    </div>
                  </td>
                  <td>
                    <div class="dishDataAmountUnit p-3 dishDes">
                      amount and unit
                    </div>
                  </td>
                </tr>
              
`;
//~~~~~~~~~~~~~~Daily description scrolldown

function addMealPlan() {
  meals++;
  const meal = $(mealHtml);
  meal.find(".mealName").val(`meal ${meals}`);
  $(".mealsContainer").append(meal);
  $(".add-dish")// add dish button
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
  allPlans.push(new Plan(planName, "", allMeals));
  createPlanData();
  console.log(allPlans);
  $("#mealModal").modal("hide");
  setTimeout(()=> {
    meals = 0;
    $(".mealsContainer").html("");
  },130);
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
  allPlans.forEach((plan) =>
    $(".allPlansContainer").append(createPlanDiv(plan))
  );
}

createPlanData();

function createPlanDiv(plan) {
  const name = plan.name;
  const meals = plan.meals.map((_, meal) => createMealDiv(meal)); //array

  const planDataElement = $(planDataHtml);
  if(name === ""){
    planDataElement.find(".planDataName").html("Daily plan #"+Number(allPlans.length));
  }
  else{
    planDataElement.find(".planDataName").html(name);
  }
  Array(...meals).forEach((mealDiv) =>
    planDataElement.find(".planDataBody").append(mealDiv)
  );
  return planDataElement;
}

function createMealDiv(meal) {
  const name = meal.name;
  const dishes = meal.dishes.map((_, dish) => $(createDishDiv(dish)));
  console.log(Array(...dishes));

  const mealDataElement = $(mealDataHtml);
  mealDataElement.find(".mealDataName").html(name);
  Array(...dishes).forEach((dishDiv) => {
    console.log(mealDataElement.find(".mealData"));
    mealDataElement.find(".mealData").append(dishDiv);
  });
  return mealDataElement;
}

function createDishDiv(dish) {
  const name = dish.name;
  const amount = dish.amount;
  const unit = dish.unit;

  const dishDataElement = $(dishDataHtml);
  dishDataElement.find(".dishDataName").html(name);
  dishDataElement.find(".dishDataAmountUnit").html(`${amount} ${unit}`);

  console.log();
  return dishDataElement;
}
