export let dishHtml = `
    
    <div class="container-fluid dishDiv input-group mb-3" id="dish">
        <label for=".dishList" class="form-label"></label>
        <button class="iconBtn delBtn delDish"><i class="bi bi-trash"></i></button>

        <input class="form-control dishName dishList" id="id="dropdownMenuLink"" placeholder="Search dish..." data-fdcid="" data-bs-toggle="dropdown" autocomplete="off">
        <button class="searchFood btn-dark me-2" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-search"></i>
        </button>
        <ul class="dropdown-menu food-dropdown-menu" aria-labelledby="dropdownMenuLink">
        </ul>
            
        <input type="number" class="dishAmount form-control" placeholder="0.00" autocomplete="off">
        <input class="form-control dishUnit" list="unitDataList" id="unitList" placeholder="unit" autocomplete="off">
        <datalist id="unitDataList">
            <option value="kg">
            <option value="grams">
            <option value="liters">
            <option value="ml">
        </datalist>
        <span class="input-group-text">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle macrosMenu"
              type="button"
              id="dishMacroMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            macros
            </button>
            <ul class="dropdown-menu" aria-labelledby="modalMacroMenu">
              <li><span class="dropdown-item-text dropdown-cal" data-value="">Calories:</span></li>
              <li><span class="dropdown-item-text dropdown-prot" data-value="">Proteins:</span></li>
              <li><span class="dropdown-item-text dropdown-carbs" data-value="">Carbs:</span></li>
              
            </ul>
          </div>
        </span>
    </div>
`;
//~~~~~~~~Dish Div

//~~~~~~~~Meal Div
export let mealHtml = `
    <div class="container-fluid mealDiv">
      <table class="table table-striped" style="margin-bottom:0">
        <thead>
          <th scope="col">
            <input type="text" class="form-control mealName" placeholder="meal name" style="border: none">  
          </th>
          <th scope="col">
            <button class="iconBtn delBtn delMeal"><i class="bi bi-trash"></i></button>
          </th>
        </thead>
      </table>


      <div class="dishContainer" style="text-align:center;">
        <button class="iconBtn add-dish"><i class="bi bi-plus-circle addDishCircle"></i></button>
      </div>
    </div>
    `;
//~~~~~~~~Meal Div

//~~~~~~~~~~~~~~Daily description scrolldown
export let planDataHtml = `
    <div class="container-fluid planData">
      <div class="row planDataHeader bg-dark">
        <div class="col-4 planDataName desTitle"><p class="centerW dayName">name</p></div>
        <div class="col-3 planDataMacros desTitle">
          <div class="dropdown">
            <button
              class="btn btn-dark dropdown-toggle"
              type="button"
              id="modalMacroMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              macros
            </button>
            <ul class="dropdown-menu" aria-labelledby="DataMacroMenu">
              <li><span class="dropdown-item-text plan-dropdown-cal">Calories:</span></li>
              <li><span class="dropdown-item-text plan-dropdown-prot">Proteins:</span></li>
              <li><span class="dropdown-item-text plan-dropdown-carbs">Carbs:</span></li>
            </ul>
          </div>
        </div>
        <div class="col-3 planDataDate desTitle"><p class="centerW planDataDate">date</p></div>
        <div class="col-2 desTitle">
          <div class="row">
            <div class="col-4">
            <button
              class="whiteIconBtn collapseB"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target= ""
              aria-expanded="false"
            >
              <i class="bi bi-arrow-bar-down"></i>  
            </button>
            </div>
            <div class="col-4">
            <button
              class="whiteIconBtn planEditBtn" 
            >
            <i class="bi bi-pencil-square"></i>
            </button>
            </div>
            <div class="col-4">
              <button class="iconBtn delBtn delPlan whiteIconBtn" style="float: right;"><i class="bi bi-trash"></i></button>
            </div>
          </div>
          

          
          
        </div>
      </div>
        <div class="collapse window row first">
            <div class="container-fluid planDataBody" style="padding: 0;">
              
            </div>
        </div>
        
      
      
    </div>`;

export let mealDataHtml = `
            <div class="mealData">
              <hr style="margin: 0;">
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

export let dishDataHtml = `  
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

export const foodItemHtml = `
<li><a class="dropdown-item" href="#">Action</a></li>`;
