import { Macros } from "./classes.js";

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

  const macros = new Macros(0, 0, 0, input.closest(".dishDiv"));
  macros.getMacrosFromFoodItem(foods[selectedFoodI]);
  setMacrosDataOnDropdown(input.closest(".dishDiv"), macros);
  0;
}

function setMacrosDataOnDropdown(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").attr("data-value", macros.calories);
  dishDiv.find(".dropdown-prot").attr("data-value", macros.protein);
  dishDiv.find(".dropdown-carbs").attr("data-value", macros.carbs);
}

function getMacrosFromDropdown(dishDiv) {
  return new Macros(
    dishDiv.find(".dropdown-cal").attr("data-value"),
    dishDiv.find(".dropdown-prot").attr("data-value"),
    dishDiv.find(".dropdown-carbs").attr("data-value"),
    dishDiv
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
  const newMacros = basicMacros.calcMacors();

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
  const allMacros = new Macros(cal, prot, carbs);
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
