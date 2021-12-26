"use strict";

const addFirstWorkoutBtn = document.querySelector(".add_first_workout_btn");
const workoutName = document.querySelector(".workout_name");
const workoutBody = document.querySelector(".workout_body");
const workoutNameP = document.querySelector(".workout_name_p");
const set = document.querySelector(".set");
let addSetBtn = document.querySelector(".add_set_btn");

let allWorkouts = [];
let setHtml = `
<div class="set">
    <button class="add_set_btn">+</button>
    <input type="number" placeholder="reps" />
    <input type="number" placeholder="weight" />
    <input type="number" placeholder="rest" />
    <input type="number" placeholder="sets" />
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

  addSet(reps, weight, rest) {
    sets.push({ reps: reps, weight: weight, rest: rest });
  }
}

addFirstWorkoutBtn.addEventListener("click", function (e) {
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
});

addSetBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const ex = new Exrecise("");
  curExe = ex;

  //   allWorkouts.find(curWorkout).addExrecise(ex);

  const repsV = document.querySelector(".reps").value;
  const weightV = document.querySelector(".weight").value;
  const restV = document.querySelector(".rest").value;

  const set = { reps: repsV, weight: weightV, rest: restV };
  // .exrecise.find(curExe)
  // .addSet(...set);
  console.log(allWorkouts);
  this.parentElement.insertAdjacentHTML("afterend", setHtml);
  this.classList.add("hidden");
  this.disabled = true;
});

function updateAddSetBtn() {}
