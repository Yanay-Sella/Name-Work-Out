"use strict";

let addFirstWorkoutBtn = document.querySelector(".add_first_workout_btn");
let workoutName = document.querySelector(".workout_name");
let workoutBody = document.querySelector(".workout_body");
let workoutNameP = document.querySelector(".workout_name_p");
let set = document.querySelector(".set");
let workoutBodyMain = document.querySelector(".workout_body_main");
let workoutBodyEnd = document.querySelector(".workout_body_end");
let exreciseNameBtn = document.querySelector(".exrecise_name_btn");
let addSetBtn = document.querySelector(".add_set_btn");
let allSetsSame = document.querySelector(".all_sets_same");
let addFirstSetBtn = document.querySelector(".first_add_set_btn");
let addExreciseBtn = document.querySelector(".add_exercise_btn");

let allWorkouts = [];
const setHtml = `
          <div class="set">
            <button class="add_set_btn">+</button>
            <input class="reps" type="number" placeholder="reps" />
            <input class="weight" type="number" placeholder="weight" />
            <input class="rest" type="number" placeholder="rest" />
            <input class="sets hidden" type="number" placeholder="sets" />
          </div>`;
const exreciseHtml = `
<div class="workout_body ">
<div class="workout_body_header">
  <h2 class="exercise_number">1.</h2>
  <input
    class="exrecise_name"
    list="exercises"
    placeholder="Exerecise Name"
  />
  <datalist id="exercises">
    <option value="Bench Press"></option>
    <option value="Bicep Curl"></option>
    <option value="Pullup"></option>
    <option value="Overhead Press"></option>
    <option value="Squat"></option>
  </datalist>

  <button class="exrecise_name_btn">search</button>
  <label class="switch">
    all sets the same
    <input class="all_sets_same" type="checkbox" />
    <span class="slider round"></span>
  </label>
</div>
<div class="workout_body_main hidden">
  <div class="set first_set">
    <button class="add_set_btn first_add_set_btn">+</button>
    <input class="reps first_reps" type="number" placeholder="reps" />
    <input
      class="weight first_weight"
      type="number"
      placeholder="weight"
    />
    <input class="rest first_rest" type="number" placeholder="rest" />
    <input class="sets hidden" type="number" placeholder="sets" />
  </div>
</div>
<div class="workout_body_end hidden">
  <button
    class="add_exercise_btn"
    style="font-size: 20px; width: fit-content; height: fit-content"
  >
    +
  </button>
</div>
  </div>`;
let curWorkout;
let curExe;

class Workout {
  constructor(name) {
    this.name = name;
    this.exrecises = [];
  }

  addExrecise(exrecise) {
    this.exrecises.push(exrecise);
    return this;
  }
}

class Exrecise {
  constructor(name, div) {
    this.name = name;
    this.sets = [];
    this.div = div;
  }

  addSet(set) {
    this.sets.push(set);
  }
}

addFirstWorkoutBtn.addEventListener("click", addWorkout.bind(this));

addSetBtn.addEventListener("click", addSet);

exreciseNameBtn.addEventListener("click", showWorkoutBody);

allSetsSame.addEventListener("click", toggleAllSetsTheSame);

addExreciseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.parentElement.parentElement.insertAdjacentHTML("afterend", exreciseHtml);
  createExrecice.call(this);
  updateNewExrecise();
  updateAddSetBtn();
});

function toggleAllSetsTheSame(e) {
  const closestWorkoutBody = this.closest(".workout_body");
  if (this.checked) {
    closestWorkoutBody.querySelector(".sets").classList.remove("hidden");
    closestWorkoutBody
      .querySelector(".first_add_set_btn")
      .classList.add("hidden");
    closestWorkoutBody.querySelector(".first_add_set_btn").disabled = true;

    closestWorkoutBody.querySelectorAll(".set").forEach((set) => {
      if (!set.classList.contains("first_set")) set.remove();
      console.log(set);
    });
  } else {
    closestWorkoutBody.querySelector(".first_reps").classList.add("reps");
    closestWorkoutBody.querySelector(".first_weight").classList.add("weight");
    closestWorkoutBody.querySelector(".first_rest").classList.add("rest");

    closestWorkoutBody.querySelector(".sets").classList.add("hidden");
    closestWorkoutBody
      .querySelector(".first_add_set_btn")
      .classList.remove("hidden");
    closestWorkoutBody.querySelector(".first_add_set_btn").disabled = false;
  }
}

function createExrecice() {
  let workoutBody = this.closest(".workout_body");
  let exreciseName = workoutBody.querySelector(".exrecise_name");
  updateNewExrecise();
  updateAddSetBtn();
  if (exreciseName.value) {
    let exName = exreciseName.value;
    const ex = new Exrecise(exName, this.closest(".workout_body"));
    curExe = ex;
    allWorkouts.find((v) => v == curWorkout).addExrecise(curExe);
    console.log(workoutBody);
    workoutBody.querySelector(".exercise_number").textContent =
      allWorkouts.find((v) => v == curWorkout).exrecises.indexOf(curExe) +
      1 +
      ".";
  } else alert("enter exrecise name");
}

function showWorkoutBody() {
  workoutBodyMain =
    this.closest(".workout_body").querySelector(".workout_body_main");
  workoutBodyMain.classList.remove("hidden");
  workoutBodyEnd.classList.remove("hidden");
}

function addWorkout(e) {
  e.preventDefault();
  if (workoutName.value) {
    const w = new Workout(workoutName.value);
    allWorkouts.push(w);
    curWorkout = w;

    workoutBody.classList.remove("hidden");
    workoutName.remove();

    workoutNameP.classList.remove("hidden");
    workoutNameP.textContent = w.name;
    createExrecice.bind(this);
    showWorkoutBody.bind(this);
  } else alert("enter the workout name");
}

function addSet(e) {
  e.preventDefault();

  workoutBodyMain =
    this.closest(".workout_body").querySelector(".workout_body_main");

  const reps = workoutBodyMain.querySelector(".reps");
  const weight = workoutBodyMain.querySelector(".weight");
  const rest = workoutBodyMain.querySelector(".rest");

  const repsV = reps.value;
  const weightV = weight.value;
  const restV = rest.value;

  const set = {
    reps: repsV,
    weight: weightV,
    rest: restV,
    div: this.parentElement,
  };

  allWorkouts
    .find((v) => v == curWorkout)
    .exrecises.find((ex) => ex === curExe)
    .addSet(set);

  console.log(allWorkouts);
  this.parentElement.insertAdjacentHTML("afterend", setHtml);
  hiddeAddSetBtn(this);

  reps.classList.remove("reps");
  weight.classList.remove("weight");
  rest.classList.remove("rest");

  updateAddSetBtn();
}

function updateAddSetBtn() {
  let curAddSetBtn = document.querySelector(".add_set_btn");
  curAddSetBtn.addEventListener("click", addSet);
  document
    .querySelectorAll(".add_set_btn")
    .forEach((btn) => btn.addEventListener("click", addSet));
}

function hiddeAddSetBtn(btn) {
  btn.classList.add("hidden");
  btn.disabled = true;
  btn.classList.remove("add_set_btn");
}

function updateNewExrecise() {
  document
    .querySelectorAll(".exrecise_name_btn")
    .forEach((btn) => btn.addEventListener("click", createExrecice));
  document
    .querySelectorAll(".add_exercise_btn")
    .forEach((btn) => btn.addEventListener("click", createExrecice));
}
