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

  if (!foodItem) {
    console.log("no food found");
    return;
  }
  let macros = getMacrosFromFood(foodItem);
  if (!macros) return;

  macros = calcMacros("", dishDiv, macros);

  displayMacros(dishDiv, macros.calories, macros.protien, macros.carbs);
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
    calories: macros.find((n) => n.nutrientName.includes("Energy")).value ?? 0,
    carbs:
      macros.find((n) => n.nutrientName.includes("Carbohydrate"))?.value ?? 0,
    protien: macros.find((n) => n.nutrientName.includes("Protein")).value ?? 0,
  };
}

export function calcMacros(_, dishDiv = $(this.closest(".dishDiv")), macros) {
  if (!macros) {
    macros = {
      calories: dishDiv.find(".dropdown-cal").attr("data-value"),
      protien: dishDiv.find(".dropdown-prot").attr("data-value"),
      carbs: dishDiv.find(".dropdown-carbs").attr("data-value"),
    };
    console.log("new");
    console.log(macros);
  }

  console.log(macros);

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
    macros.calories *= amount;
    macros.protien *= amount;
    macros.carbs *= amount;
  }
  console.log(macros);

  displayMacros(dishDiv, macros.calories, macros.protien, macros.carbs);

  return macros;
}

function displayMacros(dishDiv, cal, prot, carbs) {
  const calD = dishDiv.find(".dropdown-cal");
  console.log(dishDiv);
  calD.attr("data-value", cal);
  calD.text(`Calories: ${cal}`);

  const carD = dishDiv.find(".dropdown-prot");
  carD.attr("data-value", carbs);
  carD.text(`Carbs: ${carbs}`);

  const protD = dishDiv.find(".dropdown-carbs");
  protD.attr("data-value", prot);
  protD.text(`Protien: ${prot}`);
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
