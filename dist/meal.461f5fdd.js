// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../meal-plan/meal modules/classes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plan = exports.Meal = exports.Macros = exports.Dish = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plan = /*#__PURE__*/_createClass(function Plan(name, macros, meals) {
  var placeNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var div = arguments.length > 4 ? arguments[4] : undefined;

  _classCallCheck(this, Plan);

  this.name = name;
  this.macros = macros;
  this.date = new Date();
  this.meals = meals; //array

  this.placeNumber = placeNumber;
  this.div = div;
});

exports.Plan = Plan;

var Meal = /*#__PURE__*/_createClass(function Meal(name, dishes, div) {
  _classCallCheck(this, Meal);

  this.name = name;
  this.dishes = dishes; //array

  this.div = div;
});

exports.Meal = Meal;

var Dish = /*#__PURE__*/_createClass(function Dish(name, amount, unit, div, macros) {
  _classCallCheck(this, Dish);

  this.name = name;
  this.amount = amount;
  this.unit = unit;
  this.div = div;
  this.macros = macros;
});

exports.Dish = Dish;

var Macros = /*#__PURE__*/function () {
  function Macros(calories, protein, carbs, dishDiv) {
    _classCallCheck(this, Macros);

    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.dishDiv = dishDiv;
  }

  _createClass(Macros, [{
    key: "calcMacros",
    value: function calcMacros() {
      var amount = this.dishDiv.find(".dishAmount").val();
      var unit = this.dishDiv.find(".dishUnit").val();
      if (!amount || !unit) return this;

      if (unit == "kg" || unit == "liters") {
        this.calories *= amount * 10;
        this.protein *= amount * 10;
        this.carbs *= amount * 10;
      }

      if (unit == "grams" || unit == "ml") {
        this.calories *= amount / 100;
        this.protein *= amount / 100;
        this.carbs *= amount / 100;
      }

      this.calories = Math.round(this.calories);
      this.protein = Math.round(this.protein);
      this.carbs = Math.round(this.carbs);
      return this;
    }
  }, {
    key: "getMacrosFromFoodItem",
    value: function getMacrosFromFoodItem(food) {
      var _food$foodNutrients$f, _food$foodNutrients$f2, _food$foodNutrients$f3, _food$foodNutrients$f4;

      console.log(food);
      this.calories = (_food$foodNutrients$f = food.foodNutrients.find(function (n) {
        return n.nutrientName.includes("Energy");
      }).value) !== null && _food$foodNutrients$f !== void 0 ? _food$foodNutrients$f : 0, this.protein = (_food$foodNutrients$f2 = food.foodNutrients.find(function (n) {
        return n.nutrientName.includes("Protein");
      }).value) !== null && _food$foodNutrients$f2 !== void 0 ? _food$foodNutrients$f2 : 0, this.carbs = (_food$foodNutrients$f3 = (_food$foodNutrients$f4 = food.foodNutrients.find(function (n) {
        return n.nutrientName.includes("Carbohydrate");
      })) === null || _food$foodNutrients$f4 === void 0 ? void 0 : _food$foodNutrients$f4.value) !== null && _food$foodNutrients$f3 !== void 0 ? _food$foodNutrients$f3 : 0;
      return this;
    }
  }]);

  return Macros;
}();

exports.Macros = Macros;
},{}],"../meal-plan/meal modules/foodMacros.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findFood = findFood;
exports.updateMacros = updateMacros;

var _classes = require("./classes.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function findFood() {
  return _findFood.apply(this, arguments);
}

function _findFood() {
  _findFood = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dishDiv, dropdownMenu, nameInput, query, foodList, foodsDes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dishDiv = $(this).closest(".dishDiv");
            dropdownMenu = dishDiv.find(".food-dropdown-menu");
            dropdownMenu.empty();
            nameInput = dishDiv.find(".dishName");
            query = nameInput.val().toString();
            if (!query) dropdownMenu.append("<li><a>Searh food name...</a></li>");else dropdownMenu.append("<li><a>looading...</a></li>");
            _context.next = 8;
            return getFoods(query);

          case 8:
            foodList = _context.sent;

            if (foodList) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            dropdownMenu.empty();
            foodsDes = cleanArray(foodList.map(function (f) {
              return f.description;
            }));
            foodsDes.forEach(function (f, i) {
              var foodDiv = $("<li><a class=\"dropdown-item\" href=\"#\" data-index=".concat(i, ">").concat(f, "</a></li>"));
              dropdownMenu.append(foodDiv);
              foodDiv.click(function (e) {
                selectFood(e, nameInput, foodList);
              });
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _findFood.apply(this, arguments);
}

function selectFood(e, input, foods) {
  var selectedFood = $(e.target);
  var selectedFoodI = selectedFood.data("index");
  input.attr("data-index", selectedFoodI);
  input.val(selectedFood.html());
  var macros = new _classes.Macros(0, 0, 0, input.closest(".dishDiv"));
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
  return new _classes.Macros(dishDiv.find(".dropdown-cal").attr("data-value"), dishDiv.find(".dropdown-prot").attr("data-value"), dishDiv.find(".dropdown-carbs").attr("data-value"), dishDiv);
}

function displayDishMacros(dishDiv, macros) {
  dishDiv.find(".dropdown-cal").text("Calories: ".concat(macros.calories, "cal"));
  dishDiv.find(".dropdown-prot").text("protein: ".concat(macros.protein, "g"));
  dishDiv.find(".dropdown-carbs").text("Carbs: ".concat(macros.carbs, "g"));
}

function updateMacros(e) {
  var dishdiv = $(e.target.closest(".dishDiv"));
  var basicMacros = getMacrosFromDropdown(dishdiv);
  var newMacros = basicMacros.calcMacros();
  displayDishMacros(dishdiv, newMacros);
  displayPlanMacros(getAllMacros());
}

function getFoods(_x) {
  return _getFoods.apply(this, arguments);
}

function _getFoods() {
  _getFoods = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(des) {
    var API_KEY, req, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            API_KEY = "b1oBKkfsRfpbbbIZFfVrN7m5q9jhK6mdvyL4010F";

            if (des) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            _context2.next = 5;
            return fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=".concat(API_KEY, "&query=").concat(des));

          case 5:
            req = _context2.sent;
            _context2.next = 8;
            return req.json();

          case 8:
            data = _context2.sent;
            return _context2.abrupt("return", data.foods);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getFoods.apply(this, arguments);
}

function cleanArray(arr) {
  return _toConsumableArray(new Set(arr));
}

function displayPlanMacros(macros) {
  console.log(macros, $(".plan-dropdown-cal"));
  $(".plan-dropdown-cal").text("Calories: ".concat(macros.calories, "cal"));
  $(".plan-dropdown-prot").text("protein: ".concat(macros.protein, "g"));
  $(".plan-dropdown-carbs").text("Carbs: ".concat(macros.carbs, "g"));
}

function getAllMacros() {
  var cal = getNamedMacro("cal");
  var prot = getNamedMacro("prot");
  var carbs = getNamedMacro("carbs");
  var allMacros = new _classes.Macros(cal, prot, carbs);
  console.log(allMacros);
  return allMacros;
}

function getNamedMacro(name) {
  return _toConsumableArray($(".dropdown-".concat(name))).map(function (span) {
    var str = $(span).html();
    return +str.match(/\d+/);
  }).reduce(function (sum, val) {
    return sum + val;
  });
}
},{"./classes.js":"../meal-plan/meal modules/classes.js"}],"../meal-plan/meal modules/htmlTemplates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.planDataHtml = exports.mealHtml = exports.mealDataHtml = exports.foodItemHtml = exports.dishHtml = exports.dishDataHtml = void 0;
//~~~~~~~~Dish Div
var dishHtml = "\n    \n    <div class=\"container-fluid dishDiv input-group mb-3\" id=\"dish\">\n        <label for=\".dishList\" class=\"form-label\"></label>\n        <button\n          class=\"iconBtn delBtn delDish\"\n          data-bs-toggle=\"tooltip\"\n          data-bs-html=\"true\"\n          title = \"delete\"\n        >\n          <i class=\"bi bi-trash trashBtn\"></i>\n        </button>\n\n        <input class=\"form-control dishName dishList\" id=\"id=\"dropdownMenuLink\"\" placeholder=\"Search dish...\" data-fdcid=\"\" data-bs-toggle=\"dropdown\" autocomplete=\"off\">\n        <button class=\"searchFood btn-dark me-2\" id=\"dropdownMenuLink\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n          <i class=\"bi bi-search\"></i>\n        </button>\n        <ul class=\"dropdown-menu food-dropdown-menu\" aria-labelledby=\"dropdownMenuLink\">\n        </ul>\n            \n        <input type=\"number\" class=\"dishAmount form-control\" placeholder=\"0.00\" autocomplete=\"off\">\n        <input class=\"form-control dishUnit\" list=\"unitDataList\" id=\"unitList\" placeholder=\"unit\" autocomplete=\"off\">\n        <datalist id=\"unitDataList\">\n            <option value=\"kg\">\n            <option value=\"grams\">\n            <option value=\"liters\">\n            <option value=\"ml\">\n        </datalist>\n        <span class=\"input-group-text\">\n          <div class=\"dropdown\">\n            <button\n              class=\"btn dropdown-toggle macrosMenu\"\n              type=\"button\"\n              id=\"dishMacroMenu\"\n              data-bs-toggle=\"dropdown\"\n              aria-expanded=\"false\"\n            >\n            macros\n            </button>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"modalMacroMenu\">\n              <li><span class=\"dropdown-item-text dropdown-cal\" data-value=\"\">Calories:</span></li>\n              <li><span class=\"dropdown-item-text dropdown-prot\" data-value=\"\">Proteins:</span></li>\n              <li><span class=\"dropdown-item-text dropdown-carbs\" data-value=\"\">Carbs:</span></li>\n              \n            </ul>\n          </div>\n        </span>\n    </div>\n"; //~~~~~~~~Dish Div
//~~~~~~~~Meal Div

exports.dishHtml = dishHtml;
var mealHtml = "\n    <div class=\"container-fluid mealDiv\">\n      <table class=\"table table-striped\" style=\"margin-bottom:0\">\n        <thead>\n          <th scope=\"col\">\n            <input type=\"text\" class=\"form-control mealName\" placeholder=\"meal name\" style=\"border: none\">  \n          </th>\n          <th scope=\"col\">\n            <button\n            class=\"iconBtn delBtn delMeal\"\n              data-bs-toggle=\"tooltip\"\n              data-bs-html=\"true\"\n              title = \"delete\"\n            >\n              <i class=\"bi bi-trash trashBtn\"></i>\n            </button>\n          </th>\n        </thead>\n      </table>\n\n\n      <div class=\"dishContainer\" style=\"text-align:center;\">\n        <button \n              class=\"iconBtn add-dish\"\n              data-bs-toggle=\"tooltip\"\n              data-bs-html=\"true\"\n              title = \"add dish\">\n          <i class=\"bi bi-plus-circle addDishCircle addCircle\"></i></button>\n      </div>\n    </div>\n    "; //~~~~~~~~Meal Div
//~~~~~~~~~~~~~~Daily description scrolldown

exports.mealHtml = mealHtml;
var planDataHtml = "\n    <div class=\"container-fluid planData\" style=\"margin: 15px 0 15px 0;\" planNum=\"\">\n      <div class=\"row planDataHeader bg-dark\">\n        <div class=\"col-4 planDataName desTitle\">\n          <p class=\"centerW dayName\">name</p>\n        </div>\n        <div class=\"col-3 planDataMacros desTitle\">\n          <div class=\"dropdown\">\n            <button\n              class=\"btn btn-dark dropdown-toggle\"\n              type=\"button\"\n              id=\"modalMacroMenu\"\n              data-bs-toggle=\"dropdown\"\n              aria-expanded=\"false\"\n            >\n              macros\n            </button>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"DataMacroMenu\">\n              <li>\n                <span class=\"dropdown-item-text plan-dropdown-cal\"\n                  >Calories:</span\n                >\n              </li>\n              <li>\n                <span class=\"dropdown-item-text plan-dropdown-prot\"\n                  >Proteins:</span\n                >\n              </li>\n              <li>\n                <span class=\"dropdown-item-text plan-dropdown-carbs\"\n                  >Carbs:</span\n                >\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"col-3 planDataDate desTitle\">\n          <p class=\"centerW planDataDate\">date</p>\n        </div>\n        <div class=\"col-2 desTitle\">\n          <div class=\"row\">\n            <div class=\"col-4\">\n            <button\n              class=\"whiteIconBtn collapseB\"\n              type=\"button\"\n              data-bs-toggle=\"collapse\"\n              data-bs-target= \"\"\n              data-bs-toggle=\"tooltip\"\n              data-bs-html=\"true\"\n              title = \"expand/collapse\"\n              aria-expanded=\"false\"\n              style=\"margin-top: 6px;\"\n            >\n              <i class=\"bi bi-arrow-bar-down\"></i>  \n            </button>\n            </div>\n            <div class=\"col-4\" style=\"padding:0;\">\n            <button\n              class=\"whiteIconBtn planEditBtn\" \n              style=\"margin-top: 6px;\"\n              data-bs-toggle=\"tooltip\"\n              data-bs-html=\"true\"\n              title = \"edit\"\n            >\n            <i class=\"bi bi-pencil-square\"></i>\n            </button>\n            </div>\n            <div class=\"col-4\">\n              <button\n                class=\"iconBtn delBtn delPlan whiteIconBtn\"  \n                style=\"float: right; margin-top: 6px;\"\n                data-bs-toggle=\"tooltip\"\n                data-bs-html=\"true\"\n                title = \"delete\"\n                >\n                  <i class=\"bi bi-trash \"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"collapse window row first\">\n        <div class=\"container-fluid planDataBody\" style=\"padding: 0\"></div>\n      </div>\n    </div>";
exports.planDataHtml = planDataHtml;
var mealDataHtml = "\n            <div class=\"mealData\">\n\n              <h2 class=\"text-center mealDataName\">meal name</h2>\n              <table class=\"table table-striped\" style=\"margin-bottom:0\">\n              <thead>\n              <th scope=\"col\">Dish</th>\n              <th scope=\"col\">Amount</th>\n              </thead>\n              <tbody class=\"mealTable\">\n                \n                </tbody>\n              </table>\n            </div>\n";
exports.mealDataHtml = mealDataHtml;
var dishDataHtml = "  \n                <tr class=\"dishData\">\n                  <td>\n                    <div class=\"dishDataName p-3 dishDes\">\n                      dish name\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"dishDataAmountUnit p-3 dishDes\">\n                      amount and unit\n                    </div>\n                  </td>\n                </tr>             \n";
exports.dishDataHtml = dishDataHtml;
var foodItemHtml = "\n<li><a class=\"dropdown-item\" href=\"#\">Action</a></li>";
exports.foodItemHtml = foodItemHtml;
},{}],"../meal-plan/meal modules/divCreation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlanDiv = void 0;

var _htmlTemplates = require("./htmlTemplates.js");

var _meal = require("../meal.js");

var createPlanDiv = function createPlanDiv(plan) {
  var name = plan.name;
  var meals = plan.meals.map(function (_, meal) {
    return createMealDiv(meal);
  }); //array

  var planDataElement = $(_htmlTemplates.planDataHtml);
  planDataElement.attr("planNum", plan.placeNumber);
  planDataElement.find(".collapseB").attr("data-bs-target", ".collapse".concat(plan.placeNumber));
  setPlanNameDate(planDataElement, plan, name);
  planDataElement.find(".collapse").addClass("collapse".concat(plan.placeNumber)); // appending each mealDiv in the meals array to plandatabody and setting classes for colors

  setMealColor(planDataElement, meals);
  displayPlanMacros(planDataElement, plan.macros);
  return planDataElement;
};

exports.createPlanDiv = createPlanDiv;

function setPlanNameDate(planDiv, plan, name) {
  if (name === "") {
    planDiv.find(".planDataName").find("p").html("Nameless plan...");
  } else {
    planDiv.find(".planDataName").find("p").html(name);
  }

  planDiv.find(".planDataDate").find("p").text(plan.date.toLocaleDateString("en-GB"));
}

function setMealColor(planDiv, meals) {
  meals.each(function (_, mealDiv) {
    planDiv.find(".planDataBody").append(mealDiv);
  });
}

function displayPlanMacros(planDiv, macros) {
  // if (
  //   Number.isInteger(macros.calories) &&
  //   Number.isInteger(macros.protein) &&
  //   Number.isInteger(macros.carbs)
  // ) {
  planDiv.find(".plan-dropdown-cal").text("Calories: ".concat(macros.calories, "cal"));
  planDiv.find(".plan-dropdown-prot").text("protein: ".concat(macros.protein, "g"));
  planDiv.find(".plan-dropdown-carbs").text("Carbs: ".concat(macros.carbs, "g")); // }
}

var createMealDiv = function createMealDiv(meal) {
  var name = meal.name;
  var dishes = meal.dishes.map(function (_, dish) {
    return $(createDishDiv(dish));
  });
  if (dishes.length === 0 || meal.dishes.length === 0) return;
  var mealDataElement = $(_htmlTemplates.mealDataHtml); //class mealData

  mealDataElement.find(".mealDataName").html(name);
  dishes.each(function (_, dishDiv) {
    mealDataElement.find(".mealTable").append(dishDiv);
  });
  return mealDataElement;
};

var createDishDiv = function createDishDiv(dish) {
  var name = dish.name;
  var amount = dish.amount;
  var unit = dish.unit;
  if (!name && !amount && !unit) return;
  var dishDataElement = $(_htmlTemplates.dishDataHtml);
  dishDataElement.find(".dishDataName").html(name);
  dishDataElement.find(".dishDataAmountUnit").html("".concat(amount, " ").concat(unit));
  return dishDataElement;
};
},{"./htmlTemplates.js":"../meal-plan/meal modules/htmlTemplates.js","../meal.js":"../meal-plan/meal.js"}],"../meal-plan/meal modules/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDish = addDish;
exports.addMeal = addMeal;
exports.cleanModal = cleanModal;
exports.editPlan = editPlan;
exports.saveChanges = saveChanges;

var templates = _interopRequireWildcard(require("./htmlTemplates.js"));

var _meal = require("../meal.js");

var classes = _interopRequireWildcard(require("./classes.js"));

var divCreation = _interopRequireWildcard(require("./divCreation.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function saveChanges() {
  var index = $(".modal").attr("planNum");
  var curPlan = _meal.allPlans[index];
  createPlanFromModal(curPlan, index);
  updatePlans();
  closeModalAfterSave(index);
  console.log(_meal.allPlans);
}

function createPlanFromModal(curPlan, index) {
  var planName = $(".modal-title").val();
  var allMealsDivs = $(".mealDiv"); //this is an array

  var allMeals = allMealsDivs.map(function (_, mealDiv) {
    return new classes.Meal($(mealDiv).find(".mealName").val(), createDishArr($(mealDiv).find(".dishDiv")), mealDiv);
  });
  var planMacros = savePlanMacros();
  var newPlan = new classes.Plan(planName, planMacros, allMeals, $(".modal").attr("planNum"), $(".mealDiv"));
  if (!curPlan) _meal.allPlans.push(newPlan);else _meal.allPlans[index] = newPlan;
}

function closeModalAfterSave(index) {
  $(".modal").removeClass("planNumber-".concat(index));
  $(".modal-title").val("");
  $("#mealModal").modal("hide");
  cleanModal(); // cleaning the modal

  if (_meal.allPlans.length === 1) {
    $(".header").html("Name Workout");
    $(".openBtnDiv").addClass("openBtnDivAfter");
  }
}

function savePlanMacros() {
  return {
    calories: Number($(".plan-dropdown-cal").html().match(/\d+/)),
    protein: Number($(".plan-dropdown-prot").html().match(/\d+/)),
    carbs: Number($(".plan-dropdown-carbs").html().match(/\d+/))
  };
}

function cleanModal() {
  setTimeout(function () {
    $(".mealsContainer").html("");
  }, 130);
}

function createDishArr(divArr) {
  return divArr.map(function (_, div) {
    return new classes.Dish($(div).find(".dishName").val(), $(div).find(".dishAmount").val(), $(div).find(".dishUnit").val(), div, divArr.find());
  });
}

function updatePlans() {
  var plans = $(".planData");
  plans.each(function (_, p) {
    return p.remove();
  });

  _meal.allPlans.forEach(function (plan) {
    $(".allPlansContainer").find(".openBtnContainer").before(divCreation.createPlanDiv(plan)); // $(".openBtnDiv").before(divCreation.createPlanDiv(plan));
  });

  (0, _meal.setupClickHandlers)();
}

function addMeal(name) {
  var dishes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var meal = $(templates.mealHtml);
  if (dishes.length > 0) dishes.forEach(function (dish) {
    return addDish.call(meal, dish);
  });else addDish.call(meal);
  $(".mealsContainer").append(meal);

  if (name === undefined) {
    name = "meal ".concat($(".mealDiv").length);
  }

  meal.find(".mealName").val(name);
  (0, _meal.setupClickHandlers)();
}

function addDish() {
  var dish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new classes.Dish();
  var dishDiv = $(templates.dishHtml);
  dishDiv.find(".dishName").val(dish.name);
  dishDiv.find(".dishAmount").val(dish.amount);
  dishDiv.find(".dishUnit").val(dish.unit);
  $(this).closest(".mealDiv").find(".add-dish").before(dishDiv); // adding the dishDiv html

  (0, _meal.setupClickHandlers)();
}

function editPlan() {
  var planData = (0, _meal.getCurPlanData)(this);
  $("#mealModal").modal("toggle");
  $(".modal").attr("planNum", planData.placeNumber);
  $(".mealDiv").each(function (_, m) {
    return m.remove();
  });
  $(".modal-title").val(planData.name);
  $("#mealModal").find(".mealsContainer").append(planData.div);
  (0, _meal.setupClickHandlers)(); // Array(...planData.meals).forEach((meal) =>
  //   addMeal(meal.name, Array(...meal.dishes))
  // );
}
},{"./htmlTemplates.js":"../meal-plan/meal modules/htmlTemplates.js","../meal.js":"../meal-plan/meal.js","./classes.js":"../meal-plan/meal modules/classes.js","./divCreation.js":"../meal-plan/meal modules/divCreation.js"}],"../meal-plan/meal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPlans = void 0;
exports.getCurPlanData = getCurPlanData;
exports.setupClickHandlers = setupClickHandlers;

var _foodMacros = require("./meal modules/foodMacros.js");

var modal = _interopRequireWildcard(require("./meal modules/modal.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var allPlans = [];
exports.allPlans = allPlans;
setupClickHandlers(); //~~~~~~~~~~~~~~Daily description scrolldown

function createPlan() {
  var planName = $(".dailyName").val();

  if (allPlans.find(function (p) {
    return p.name === planName;
  })) {
    alert("can't use the same plan name twice");
  } else {
    $(".modal").modal("show");
    $(".modal").attr("planNum", allPlans.length);
    $(".modal-title").text($(".dailyName").val());

    if ($(".mealDiv").length === 0) {
      modal.addMeal();
    }
  }
}

function deleteDiv() {
  if (this.classList.contains("delMeal")) this.closest(".mealDiv").remove();
  if (this.classList.contains("delDish")) this.closest(".dishDiv").remove();

  if (this.classList.contains("delPlan")) {
    deletePlan(this);
  }

  setupClickHandlers();
}

function deletePlan(planDiv) {
  var plan = getCurPlanData(planDiv);
  planDiv.closest(".planData").remove();
  allPlans.splice(allPlans.findIndex(function (p) {
    return p === plan;
  }), 1);

  if (allPlans.length === 0 && $(".openBtnDiv").hasClass("openBtnDivAfter")) {
    $(".openBtnDiv").removeClass("openBtnDivAfter");
    $(".header").html("Click + to add plans");
  }

  updatePlansAfterDel();
}

function updatePlansAfterDel() {
  $(".planData").each(function (i, p) {
    $(p).attr("planNum", i);
    getCurPlanData(p).placeNumber = i;
  });
}

function getCurPlanData(el) {
  var curPlanDiv = $(el.closest(".planData"));
  var curPlanIndex = curPlanDiv.attr("planNum");
  var curPlanData = allPlans[curPlanIndex];
  console.log(curPlanData);
  return curPlanData;
}

function updateAddPlanButtonPicIn() {
  $(this).removeClass("bi-plus-circle");
  $(this).addClass("bi-plus-circle-fill");
}

function updateAddPlanButtonPicOut() {
  $(this).removeClass("bi-plus-circle-fill");
  $(this).addClass("bi-plus-circle ");
}

function updateTrashButtonIn() {
  $(this).removeClass("bi-trash");
  $(this).addClass("bi-trash-fill ");
}

function updateTrashButtonOut() {
  $(this).removeClass("bi-trash-fill");
  $(this).addClass("bi-trash ");
}

function setupClickHandlers() {
  //daily plan modal button
  $("#openModal").off("click").click(createPlan); //add meal to daily plan button

  $(".addMeal").off("click").click(function () {
    return modal.addMeal();
  }); //save daily changes button

  $(".savePlanBtn").off("click").click(modal.saveChanges);
  $(".closeModalBtn").off("click").click(function () {
    return modal.cleanModal();
  });
  $(".planEditBtn").off("click").click(modal.editPlan);
  $(".add-dish") // add dish button
  .off("click").click(modal.addDish);
  $(".delBtn").off("click").click(deleteDiv);
  $(".searchFood").off("click").click(_foodMacros.findFood);
  $(".dishName").on("input", _foodMacros.findFood);
  $(".dishAmount").on("input", _foodMacros.updateMacros);
  $(".dishUnit").on("input", _foodMacros.updateMacros);
  $(".addCircle").hover(updateAddPlanButtonPicIn, updateAddPlanButtonPicOut);
  $(".trashBtn").hover(updateTrashButtonIn, updateTrashButtonOut); // $(".macros-dropdown-menu").off("click").click(renderMacros);
}
},{"./meal modules/foodMacros.js":"../meal-plan/meal modules/foodMacros.js","./meal modules/modal.js":"../meal-plan/meal modules/modal.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49373" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../meal-plan/meal.js"], null)
//# sourceMappingURL=/meal.461f5fdd.js.map