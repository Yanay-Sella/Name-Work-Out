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

$("button").click(function (e) {
  if ($(this).is("#openModal")) {
    //if opening a new daily plan
    const title = $(".modal-title").text($(".dailyName").val());
    if (meals === 0) {
      addMealPlan();
    }
  }
  if ($(this).is("#addMeal")) {
    // if adding a meal
    addMealPlan();
  }
  // if($(this).hasClass("add-dish")){ // if adding a dish (not using id because its not unique)
  //     addDish.call(this);
  // }

  if ($(this).hasClass("savePlanBtn")) {
    saveChanges();
  }
});

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
let mealHtml = `
    <div class="container-fluid mealDiv">
        <input type="text" class="form-control mealName" placeholder="meal name" style="border: none">
        <button class="btn btn-primary add-dish">add dish</button>
        ${dishHtml}
    </div>
    `;
let planDataHtml = `
<div class="container-fluid planData">
      <div class="row container-fluid planDataHeader">
        <div class="col planDataName form-control">name</div>
        <div class="col planDataMacros form-control">macros</div>
        <div class="col planDataDate form-control">date</div>
        <button
          class="col btn btn-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          open/close
        </button>
        <div class="collapse container-fluid planDataBody" id="collapseExample">
          <!-- <div class="collapse container-fluid planDataBody" id="collapseExample"> -->
          
        </div>
      </div>
      <div class="planDataFooter container-fluid">
        <button
          class="btn btn-dark float-right"
          style="width: auto; float: right"
        >
          edit
        </button>
      </div>
    </div>`;

let mealDataHtml = `
            <div class="mealData container-fluid">
              <h2 class="text-center form-control mealDataName">meal name</h2>
            </div>
`;
let dishDataHtml = `
              <div class="dishData container px-4">
                <div class="row gx-5">
                  <div class="col">
                    <div class="dishDataName p-3 border bg-light col">
                      dish name
                    </div>
                  </div>
                  <div class="col">
                    <div class="dishDataAmountUnit p-3 border bg-light col">
                      amount and unit
                    </div>
                  </div>
                </div>
              </div>
`;

function addMealPlan() {
  meals++;
  const meal = $(mealHtml);
  meal.find(".mealName").val(`meal ${meals}`);
  $(".mealsContainer").append(meal);
  $(".add-dish")
    .off("click")
    .click(function () {
      //detecting a click for one button!
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
  // const planDataElement = $(planDataHtml);
  // const mealDataElement = $(mealDataHtml);
  // const dishDataElement = $(dishDataHtml);

  // mealDataElement.append(dishDataElement);
  // planDataElement.find(".planDataBody").append(mealDataElement);
  // $(".allPlansContainer").append(planDataElement);
  allPlans.forEach((plan) =>
    $(".allPlansContainer").append(createPlanDiv(plan))
  );
}

createPlanData();

function createPlanDiv(plan) {
  const name = plan.name;
  const meals = plan.meals.map((_, meal) => createMealDiv(meal));

  const planDataElement = $(planDataHtml);
  planDataElement.find(".planDataName").val(name);
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
  mealDataElement.find(".mealDataName").val(name);
  Array(...dishes).forEach((dishDiv) => mealDataElement.append(dishDiv));

  return mealDataElement;
}

function createDishDiv(dish) {
  const name = dish.name;
  const amount = dish.amount;
  const unit = dish.unit;

  const dishDataElement = $(dishDataHtml);
  dishDataElement.find(".dishDataName").val(name);
  dishDataElement.find(".dishDataAmountUnit").val(`${amount} ${unit}`);

  console.log();
  return dishDataElement;
}
