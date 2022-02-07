export async function findFood() {
  const dishDiv = $(this).closest(".dishDiv");
  const dropdownMenu = dishDiv.find(".food-dropdown-menu");

  dropdownMenu.empty();

  const nameInput = dishDiv.find(".dishName");
  const query = nameInput.val().toString();

  dropdownMenu.append(`<li><a>looading...</a></li>`);
  const searchFinds = await getFoods(query);
  dropdownMenu.empty();

  console.log(searchFinds);

  const foodsDes = cleanArray(searchFinds.foods.map((f) => f.description));
  foodsDes.forEach((f, i) => {
    const foodDiv = $(
      `<li><a class="dropdown-item" href="#" data-fdcid=${searchFinds.foods[i].fdcId}>${f}</a></li>`
    );
    dropdownMenu.append(foodDiv);
    foodDiv.click((e) => {
      selectFood(e, nameInput);
    });
  });
}

const API_KEY = "b1oBKkfsRfpbbbIZFfVrN7m5q9jhK6mdvyL4010F";

async function getFoodByName(des) {
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${des}`
  );
  const data = await req.json();
  return data;
}

async function getFoodByfdcId(id) {
  const req = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${API_KEY}`
  );
  const data = await req.json();
  return data;
}

async function getFoods(des) {
  const data = await getFoodByName(des);
  const foods = data.foods;
  const name = foods[0].description;
  // const macros = food.foodNutrients;
  return {
    name,
    foods,
  };
}

function cleanArray(arr) {
  return [...new Set(arr)];
}

function selectFood(e, input) {
  const el = $(e.target);
  const id = el.data("fdcid");
  input.attr("data-fdcid", id);
  input.val(el.html());
  renderMacros(el, id);
}

async function renderMacros(el, id) {
  const dishDiv = $(el).closest(".dishDiv");

  if (!id) {
    console.log("no id");
    return;
  }

  dishDiv.find(".dropdown-cal").text(`loading...`);
  dishDiv.find(".dropdown-prot").text(`loading...`);
  dishDiv.find(".dropdown-carbs").text(`loading...`);
  const foodItem = await getFoodByfdcId(id);

  if (!foodItem) {
    console.log("no food found");
    return;
  }
  const macros = getMacrosFromFood(foodItem);
  if (!macros) return;

  // dishDiv.find(".macros-dropdown-menu").toggleClass("show");
  dishDiv.find(".dropdown-cal").text(`Calories: ${macros.calories}`);
  dishDiv.find(".dropdown-prot").text(`Protein: ${macros.protien}`);
  dishDiv.find(".dropdown-carbs").text(`Carbs: ${macros.carbs}`);

  console.log(foodItem);
  //labelNutrients
}

function getMacrosFromFood(food) {
  if (!food) return;
  const macros = food.foodNutrients;
  console.log(macros);

  if (!macros) {
    console.log("no macros found");
    return;
  }
  return {
    calories: macros.find((n) => n.nutrient.name == "Energy").amount ?? 0,
    carbs: macros.find((n) => n.nutrient.name == "Carbohydrates")?.amount ?? 0,
    protien: macros.find((n) => n.nutrient.name == "Protein").amount ?? 0,
  };
}
