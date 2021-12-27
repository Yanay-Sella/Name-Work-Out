"use strict";

const addFirstWorkoutBtn = document.querySelector(".add_first_workout_btn");
const workoutName = document.querySelector(".workout_name");
const workoutBody = document.querySelector(".workout_body");
const workoutNameP = document.querySelector(".workout_name_p");
const set = document.querySelector(".set");
const workoutBodyMain = document.querySelector(".workout_body_main");
const workoutBodyEnd = document.querySelector(".workout_body_end");
const exreciseNameBtn = document.querySelector(".exrecise_name_btn");
const exreciseName = document.querySelector(".exrecise_name");
let addSetBtn = document.querySelector(".add_set_btn");
const allSetsSame = document.querySelector(".all_sets_same");
const addFirstSetBtn = document.querySelector(".first_add_set_btn");
const addExreciseBtn = document.querySelector(".add_exercise_btn");

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
  }
}

class Exrecise {
  constructor(name) {
    this.name = name;
    this.sets = [];
  }

  addSet(set) {
    this.sets.push(set);
  }
}

addFirstWorkoutBtn.addEventListener("click", addWorkout);

addSetBtn.addEventListener("click", addSet);

exreciseNameBtn.addEventListener("click", createExrecice);

allSetsSame.addEventListener("click", toggleAllSetsTheSame);

addExreciseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.parentElement.parentElement.insertAdjacentHTML("afterend", exreciseHtml);
});

function toggleAllSetsTheSame(e) {
  if (this.checked) {
    document.querySelector(".sets").classList.remove("hidden");
    document.querySelector(".first_add_set_btn").classList.add("hidden");
    document.querySelector(".first_add_set_btn").disabled = true;

    document.querySelectorAll(".set").forEach((set) => {
      if (!set.classList.contains("first_set")) set.remove();
      console.log(set);
    });
  } else {
    document.querySelector(".first_reps").classList.add("reps");
    document.querySelector(".first_weight").classList.add("weight");
    document.querySelector(".first_rest").classList.add("rest");

    document.querySelector(".sets").classList.add("hidden");
    document.querySelector(".first_add_set_btn").classList.remove("hidden");
    document.querySelector(".first_add_set_btn").disabled = false;
  }
}

function createExrecice(e) {
  if (exreciseName.value) {
    let exName = exreciseName.value;
    const ex = new Exrecise(exName);
    curExe = ex;
    allWorkouts.find((v) => v == curWorkout).exrecises.push(curExe);

    workoutBodyMain.classList.remove("hidden");
    workoutBodyEnd.classList.remove("hidden");
  } else alert("enter exrecise name");
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
  } else alert("enter the workout name");
}

function addSet(e) {
  e.preventDefault();

  //   allWorkouts.find(curWorkout).addExrecise(ex);

  const reps = document.querySelector(".reps");
  const weight = document.querySelector(".weight");
  const rest = document.querySelector(".rest");

  const repsV = reps.value;
  const weightV = weight.value;
  const restV = rest.value;

  const set = { reps: repsV, weight: weightV, rest: restV };

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
}

function hiddeAddSetBtn(btn) {
  btn.classList.add("hidden");
  btn.disabled = true;
  btn.classList.remove("add_set_btn");
}
