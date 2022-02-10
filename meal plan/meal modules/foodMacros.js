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
  return {
    calories:
      food.foodNutrients.find((n) => n.nutrientName.includes("Energy")).value ??
      0,
    carbs:
      food.foodNutrients.find((n) => n.nutrientName.includes("Carbohydrate"))
        ?.value ?? 0,
    protien:
      food.foodNutrients.find((n) => n.nutrientName.includes("Protein"))
        .value ?? 0,
  };
}

function setMacrosDataOnDropdown(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").attr("data-value", macros.calories);
  dishDiv.find(".dropdown-prot").attr("data-value", macros.protien);
  dishDiv.find(".dropdown-carbs").attr("data-value", macros.carbs);
}

function getMacrosFromDropdown(dishDiv) {
  return {
    calories: dishDiv.find(".dropdown-cal").attr("data-value"),
    protien: dishDiv.find(".dropdown-prot").attr("data-value"),
    carbs: dishDiv.find(".dropdown-carbs").attr("data-value"),
  };
}

function calcMacors(dishDiv, macros) {
  const amount = dishDiv.find(".dishAmount").val();
  const unit = dishDiv.find(".dishUnit").val();

  if (!amount || !unit) return macros;

  console.log(`amount: ${amount} unit: ${unit}`);

  if (unit == "kg" || unit == "liters") {
    macros.calories *= amount * 10;
    macros.protien *= amount * 10;
    macros.carbs *= amount * 10;
  }

  if (unit == "grams" || unit == "ml") {
    macros.calories *= amount / 100;
    macros.protien *= amount / 100;
    macros.carbs *= amount / 100;
  }
  console.log(macros);

  macros = roundMacros(macros);
  return macros;
}

function roundMacros(macros) {
  return {
    calories: macros.calories.toFixed(2),
    protien: macros.protien.toFixed(2),
    carbs: macros.carbs.toFixed(2),
  };
}

function displayMacros(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").text(`Calories: ${macros.calories}`);
  dishDiv.find(".dropdown-prot").text(`Protien: ${macros.protien}`);
  dishDiv.find(".dropdown-carbs").text(`Carbs: ${macros.carbs}`);
}

export function updateMacros(e) {
  const dishdiv = $(e.target.closest(".dishDiv"));
  console.log(dishdiv);
  const basicMacros = getMacrosFromDropdown(dishdiv);
  const newMacros = calcMacors(dishdiv, basicMacros);
  console.log(basicMacros, newMacros);
  displayMacros(dishdiv, newMacros);
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

function cleanArray(arr) {
  return [...new Set(arr)];
}
