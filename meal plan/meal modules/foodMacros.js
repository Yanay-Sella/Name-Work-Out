export async function findFood() {
  const dishDiv = $(this).closest(".dishDiv");
  const dropdownMenu = dishDiv.find(".food-dropdown-menu");

  dropdownMenu.empty();

  const nameInput = dishDiv.find(".dishName");
  const query = nameInput.val().toString();

  if (!query) dropdownMenu.append(`<li><a>Searh food name...</a></li>`);
  else dropdownMenu.append(`<li><a>looading...</a></li>`);

  const foodList = await getFoods(query);
  if (!foodList) return;

  dropdownMenu.empty();

  const foodsDes = cleanArray(foodList.map((f) => f.description));

  foodsDes.forEach((f, i) => {
    const foodDiv = $(
      `<li><a class="dropdown-item" href="#" data-index=${i}>${f}</a></li>`
    );
    dropdownMenu.append(foodDiv);
    foodDiv.click((e) => {
      selectFood(e, nameInput, foodList);
    });
  });
}

function selectFood(e, input, foods) {
  const selectedFood = $(e.target);
  const selectedFoodI = selectedFood.data("index");

  input.attr("data-index", selectedFoodI);
  input.val(selectedFood.html());

  const macros = getMacrosFromFoodItem(foods[selectedFoodI]);
  setMacrosDataOnDropdown(input.closest(".dishDiv"), macros);
}

function getMacrosFromFoodItem(food) {
  console.log(food);

  return createMacorObj(
    food.foodNutrients.find((n) => n.nutrientName.includes("Energy")).value ??
      0,
    food.foodNutrients.find((n) => n.nutrientName.includes("Protein")).value ??
      0,
    food.foodNutrients.find((n) => n.nutrientName.includes("Carbohydrate"))
      ?.value ?? 0
  );
}

function setMacrosDataOnDropdown(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").attr("data-value", macros.calories);
  dishDiv.find(".dropdown-prot").attr("data-value", macros.protein);
  dishDiv.find(".dropdown-carbs").attr("data-value", macros.carbs);
}

function getMacrosFromDropdown(dishDiv) {
  return createMacorObj(
    dishDiv.find(".dropdown-cal").attr("data-value"),
    dishDiv.find(".dropdown-prot").attr("data-value"),
    dishDiv.find(".dropdown-carbs").attr("data-value")
  );
}

function calcMacors(dishDiv, baseMacros) {
  const amount = dishDiv.find(".dishAmount").val();
  const unit = dishDiv.find(".dishUnit").val();

  if (!amount || !unit) return baseMacros;

  console.log(`amount: ${amount} unit: ${unit}`);

  if (unit == "kg" || unit == "liters") {
    baseMacros.calories *= amount * 10;
    baseMacros.protein *= amount * 10;
    baseMacros.carbs *= amount * 10;
  }

  if (unit == "grams" || unit == "ml") {
    baseMacros.calories *= amount / 100;
    baseMacros.protein *= amount / 100;
    baseMacros.carbs *= amount / 100;
  }

  console.log(baseMacros);
  return createMacorObj(
    baseMacros.calories,
    baseMacros.protein,
    baseMacros.carbs
  );
}

function displayDishMacros(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").text(`Calories: ${macros.calories}`);
  dishDiv.find(".dropdown-prot").text(`protein: ${macros.protein}`);
  dishDiv.find(".dropdown-carbs").text(`Carbs: ${macros.carbs}`);
}

export function updateMacros(e) {
  const dishdiv = $(e.target.closest(".dishDiv"));
  const basicMacros = getMacrosFromDropdown(dishdiv);
  const newMacros = calcMacors(dishdiv, basicMacros);

  displayDishMacros(dishdiv, newMacros);
  displayPlanMacros(getAllMacros());
}

async function getFoods(des) {
  const API_KEY = "b1oBKkfsRfpbbbIZFfVrN7m5q9jhK6mdvyL4010F";

  if (!des) return;
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${des}`
  );
  const data = await req.json();
  return data.foods;
}

function createMacorObj(calories, protein, carbs) {
  return {
    calories: Math.round(+calories),
    protein: Math.round(+protein),
    carbs: Math.round(+carbs),
  };
}

function cleanArray(arr) {
  return [...new Set(arr)];
}

function displayPlanMacros(macros) {
  $(".plan-dropdown-cal").text(`Calories: ${macros.calories}`);
  $(".plan-dropdown-prot").text(`protein: ${macros.protein}`);
  $(".plan-dropdown-carbs").text(`Carbs: ${macros.carbs}`);
}

function getAllMacros() {
  const cal = getNamedMacro("cal");
  const prot = getNamedMacro("prot");
  const carbs = getNamedMacro("carbs");
  const allMacros = createMacorObj(cal, prot, carbs);
  console.log(allMacros);
  return allMacros;
}

function getNamedMacro(name) {
  return [...$(`.dropdown-${name}`)]
    .map((span) => {
      const str = $(span).html();
      return +str.slice(str.indexOf(": ") + 2);
    })
    .reduce((sum, val) => sum + val);
}
