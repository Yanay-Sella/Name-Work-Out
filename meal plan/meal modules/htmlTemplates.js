export let dishHtml = `
    <div class="container-fluid dishDiv input-group mb-3" id="dish">
        <label for="dishList" class="form-label"></label>
        <button class="btn btn-primary delBtn delDish">X</button>
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
export let mealHtml = `
    <div class="container-fluid mealDiv">
      <table class="table table-striped" style="margin-bottom:0">
        <thead>
          <th scope="col">
            <input type="text" class="form-control mealName" placeholder="meal name" style="border: none">  
          </th>
          <th scope="col">
            <button class="btn btn-primary delBtn delMeal" style="float: right;">X</button>
          </th>
        </thead>
      </table>
      <div>
        <button class="btn btn-primary add-dish">add dish</button>
      </div>
    </div>
    `;
//~~~~~~~~Meal Div

//~~~~~~~~~~~~~~Daily description scrolldown
export let planDataHtml = `
    <div class="container-fluid planData">
      <div class="row container-fluid planDataHeader bg-dark">
        <div class="col-3 planDataName desTitle"><p class="centerW">name</p></div>
        <div class="col-3 planDataMacros desTitle"><p class="centerW">macros</p></div>
        <div class="col-3 planDataDate desTitle"><p class="centerW planDataDate">date</p></div>
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
              class="btn btn-light planEditBtn" 
          >
              edit
          </button>
          <button class="btn btn-primary delBtn delPlan" style="float: right;">X</button>
        </div>
      </div>
        <div class="collapse window row first">
            <div class="container-fluid planDataBody" style="padding: 0;">
              
            </div>
        </div>
        
      
      
    </div>`;

export let mealDataHtml = `
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
