let meals = 0;

let allPlans = [];

class Plan {
  constructor(name, macros, meals, placeNumber = 0) {
    this.name = name;
    this.macros = macros;
    this.date = new Date();
    this.meals = meals; //array
    this.placeNumber = placeNumber;
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
$("#openModal").click(function (e) {
  const title = $(".modal-title").text($(".dailyName").val());
  if (meals === 0) {
    addMealPlan();
  }
});

//add meal to daily plan button
$("#addMeal").click(function (e) {
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
      <div class="row container-fluid planDataHeader bg-dark">
        <div class="col-3 planDataName desTitle"><p class="centerW">name</p></div>
        <div class="col-3 planDataMacros desTitle"><p class="centerW">macros</p></div>
        <div class="col-3 planDataDate desTitle"><p class="centerW">date</p></div>
        <div class="col-3 desTitle">
          <button
            class="btn btn-light collapseB"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target= ""
            aria-expanded="false"
          >
            open/close
          </button>
          <button
              class="btn btn-light" 
          >
              edit
          </button>
        </div>
      </div>
        <div class="collapse window row first">
            <div class="container-fluid planDataBody" style="padding: 0;">
              
            </div>
        </div>
        
      
      
    </div>`;

let mealDataHtml = `
            <div class="mealData">
              <h2 class="text-center mealDataName">meal name</h2>
              <table class="table table-striped" style="margin-bottom:0">
              <thead>
              <th scope="col">Dish</th>
              <th scope="col">Amount</th>
              </thead>
              <tbody class="mealTable">
                
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
  $(".add-dish") // add dish button
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
  allPlans.push(new Plan(planName, "", allMeals, allPlans.length + 1));
  createPlanData();
  $("#mealModal").modal("hide");
  setTimeout(() => {
    meals = 0;
    $(".mealsContainer").html("");
  }, 130);
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
  allPlans.forEach((plan) => {
    if (plan.placeNumber >= allPlans.length) {
      console.log(plan.placeNumber);
      $(".allPlansContainer").append(createPlanDiv(plan));
    }
  });
}

function createPlanDiv(plan) {
  const name = plan.name;
  const meals = plan.meals.map((_, meal) => createMealDiv(meal)); //array

  const planDataElement = $(planDataHtml);
  if (name === "") {
    planDataElement
      .find(".planDataName").find("p")
      .html("Daily plan #" + Number(allPlans.length));
  } else {
    planDataElement.find(".planDataName").html(name);
  }

  planDataElement
    .find(".collapseB")
    .attr("data-bs-target", `.collapse${plan.placeNumber}`);
  planDataElement.find(".collapse").addClass(`collapse${plan.placeNumber}`);
  
  // appending each mealDiv in the meals array to plandatabody and setting classes for colors
  Array(...meals).forEach((mealDiv ,i) =>{ 
    planDataElement.find(".planDataBody").append(mealDiv);
    if(i%2===0){
      if(i===0){
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDarkFirst");
      }
      if(i===meals.length-1){
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDarkLast");
      }
      else{
        $(planDataElement.find(".mealData")[i]).addClass("mealDataDark");
      }
    }
  });
  return planDataElement;
}

function createMealDiv(meal) {
  const name = meal.name;
  const dishes = meal.dishes.map((_, dish) => $(createDishDiv(dish)));
  const mealDataElement = $(mealDataHtml); //class mealData
  mealDataElement.find(".mealDataName").html(name);
  Array(...dishes).forEach((dishDiv) => {
    mealDataElement.find(".mealTable").append(dishDiv);

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

  return dishDataElement;
}
