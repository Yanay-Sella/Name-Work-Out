export async function findFood() {
  const dishDiv = $(this).closest(".dishDiv");
  const dropdownMenu = dishDiv.find(".food-dropdown-menu");

  dropdownMenu.empty();

  const nameInput = dishDiv.find(".dishName");
  const query = nameInput.val().toString();

  if (!query) dropdownMenu.append(`<li><a>Searh food name...</a></li>`);
  else dropdownMenu.append(`<li><a>looading...</a></li>`);

  const searchFinds = await getFoods(query);
  if (!searchFinds) return;

  dropdownMenu.empty();

  const foodsDes = cleanArray(searchFinds.foods.map((f) => f.description));
  foodsDes.forEach((f, i) => {
    const foodDiv = $(
      `<li><a class="dropdown-item" href="#" data-index=${i}>${f}</a></li>`
    );
    dropdownMenu.append(foodDiv);
    foodDiv.click((e) => {
      selectFood(e, nameInput, searchFinds.foods);
    });
  });
}

async function getFoods(des) {
  const data = await getFoodByName(des);
  if (!des || !data) return;

  const foods = data.foods;

  if (!foods.length) return;

  const name = foods[0].description;
  // const macros = food.foodNutrients;
  return {
    name,
    foods,
  };
}

function selectFood(e, input, foods) {
  const el = $(e.target);
  const index = el.data("index");
  input.attr("data-index", index);
  input.val(el.html());

  renderMacros(el, foods[index]);
}

async function renderMacros(el, foodItem) {
  const dishDiv = $(el).closest(".dishDiv");

  displayMacros(dishDiv, "loading..");

  // const foodItem = await getFoodByfdcId(id);

  if (!foodItem) {
    console.log("no food found");
    return;
  }
  const macros = getMacrosFromFood(foodItem);
  if (!macros) return;

  console.log(macros);

  displayMacros(
    dishDiv,
    `Calories: ${macros.calories}`,
    `Protein: ${macros.protien}`,
    `Carbs: ${macros.carbs}`
  );
}

function getMacrosFromFood(food) {
  if (!food) return;
  const macros = food.foodNutrients;

  if (!macros) {
    console.log("no macros found");
    return;
  }
  return {
    calories: macros.find((n) => n.nutrientName == "Energy").value ?? 0,
    carbs: macros.find((n) => n.nutrientName == "Carbohydrates")?.value ?? 0,
    protien: macros.find((n) => n.nutrientName == "Protein").value ?? 0,
  };
}

function displayMacros(dishDiv, cal, carbs, prot) {
  dishDiv.find(".dropdown-cal").text(cal);
  dishDiv.find(".dropdown-prot").text(carbs);
  dishDiv.find(".dropdown-carbs").text(prot);
}

const API_KEY = "b1oBKkfsRfpbbbIZFfVrN7m5q9jhK6mdvyL4010F";

async function getFoodByName(des) {
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${des}`
  );
  const data = await req.json();
  return data;
}

function cleanArray(arr) {
  return [...new Set(arr)];
}

// async function getFoodByfdcId(id) {
//   const req = await fetch(
//     `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${API_KEY}`
//   );
//   const data = await req.json();
//   return data;
// }
