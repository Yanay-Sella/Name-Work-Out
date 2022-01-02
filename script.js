"use strict";

// let addFirstWorkoutBtn = document.querySelector(".add_first_workout_btn");
// let workoutName = document.querySelector(".workout_name");
// let workoutBody = document.querySelector(".workout_body");
// let workoutNameP = document.querySelector(".workout_name_p");
// let set = document.querySelector(".set");
// let workoutBodyMain = document.querySelector(".workout_body_main");
// let workoutBodyEnd = document.querySelector(".workout_body_end");
// let exreciseNameBtn = document.querySelector(".exrecise_name_btn");
// let addSetBtn = document.querySelector(".add_set_btn");
// let allSetsSame = document.querySelector(".all_sets_same");
// let addFirstSetBtn = document.querySelector(".first_add_set_btn");
// let addExreciseBtn = document.querySelector(".add_exercise_btn");

let allWorkouts = [];
const setHtml = `
          <div class="set">
            <input class="reps" type="number" placeholder="reps" />
            <input class="weight" type="number" placeholder="weight" />
            <input class="rest" type="number" placeholder="rest" />
            <input class="sets hidden" type="number" placeholder="sets" />
          </div>`;
const exreciseHtml = `
        <div class="exercise">
          <div class="exercise_body_header">
            <h2 class="exercise_number">1.</h2>
            <input
              class="exercise_name"
              list="exercises_options"
              placeholder="Exerecise Name"
            />
            <datalist id="exercises_options">
              <option value="Bench Press"></option>
              <option value="Bicep Curl"></option>
              <option value="Pullup"></option>
              <option value="Overhead Press"></option>
              <option value="Squat"></option>
            </datalist>

            <button class="add_set_btn">+</button>
            <label class="switch">
              all sets the same
              <input class="all_sets_same" type="checkbox" checked=true/>
              <span class="slider round"></span>
            </label>
          </div>
          <div class="exercise_body_main">
          </div>
          <div class="exercise_body_end ">
            <button
              class="add_exercise_btn"
              style="font-size: 20px; width: fit-content; height: fit-content"
            >
              +
            </button>
          </div>
          `;

const workoutHtml = `
  <div class="workout">
      <div class="workout_header">
        <button class="create_workout_btn">+</button>
        <input
          class="workout_name"
          type="text"
          placeholder="Name Of The Workout"
        />
        <p class="workout_name_p hidden"></p>
        <button>open/close</button>
      </div>
      <div class="workout_body">
      </div
    </div>
    `;

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
createWorkout(document.body);
addEventListener;

function createWorkout(el) {
  el.insertAdjacentHTML("afterbegin", workoutHtml);
  el.querySelector(".create_workout_btn").addEventListener(
    "click",
    createExercise
  );

  allWorkouts.push({
    name: el.querySelector(".workout_name").value,
    exercises: [],
    div: el.querySelector(".workout"),
  });
}

function createExercise() {
  let workoutBody = this.closest(".workout").querySelector(".workout_body");
  workoutBody.insertAdjacentHTML("beforeend", exreciseHtml);

  workoutBody.querySelectorAll(".add_set_btn").forEach((btn) => {
    btn.addEventListener("click", createSet);
  });

  workoutBody.querySelectorAll(".add_exercise_btn").forEach((btn) => {
    btn.addEventListener("click", createExercise);
  });

  workoutBody.querySelectorAll(".switch").forEach((btn) => {
    btn.addEventListener("click", setupAllSetsSameBtn);
  });

  console.log("ex");
  // setupAllSetsSameBtn.call(workoutBody.querySelector(".switch"));

  let curExerciseDiv = [...workoutBody.querySelectorAll(".exercise")].slice(
    -1
  )[0];

  allWorkouts
    .find((el) => el.div === this.closest(".workout"))
    .exercises.push({
      name: getCurValue(workoutBody, "exercise_name", ".exercise"),
      div: curExerciseDiv,
      sets: [],
    });

  this.remove();
}

function createSet() {
  let exerciseBodyMain = this.closest(".exercise").querySelector(
    ".exercise_body_main"
  );
  exerciseBodyMain.insertAdjacentHTML("beforeend", setHtml);

  let curSetDiv = [...exerciseBodyMain.querySelectorAll(".set")].slice(-1)[0];
  let curReps = getCurValue(exerciseBodyMain, "reps");
  let curWeight = getCurValue(exerciseBodyMain, "weight");
  let curRest = getCurValue(exerciseBodyMain, "rest");

  allWorkouts
    .find((el) => el.div === exerciseBodyMain.closest(".workout"))
    .exercises.find((el) => el.div === exerciseBodyMain.closest(".exercise"))
    .sets.push({
      reps: curReps,
      weight: curWeight,
      rest: curRest,
      div: curSetDiv,
    });

  setupAllSetsSameBtn.bind(this);
}

function getCurValue(ebm, val, type = ".set") {
  return [...ebm.querySelectorAll(type)].slice(-2)[0].querySelector(`.${val}`)
    .value;
}

function setupAllSetsSameBtn() {
  console.log("hi");
  const exerciseBodyMain = this.closest(".exercise").querySelector(
    ".exercise_body_main"
  );
  const addSetBtn = exerciseBodyMain
    .closest(".exercise")
    .querySelector(".add_set_btn");

  const btn = this.querySelector(".all_sets_same");

  if (btn.checked) {
    exerciseBodyMain.querySelectorAll(".set").forEach((set, i, arr) => {
      console.log(arr);
      if (i >= 1) {
        console.log("hi");
        set.remove();
        set.querySelector(".sets").classList.remove("hidden");
      } else if (arr.length === 0) createSet();
      else set.querySelector(".sets").classList.remove("hidden");
    });

    addSetBtn.disabled = true;
    addSetBtn.classList.add("hidden");
    // set.querySelector(".sets").classList.remove("hidden");
  } else {
    exerciseBodyMain.querySelector(".sets").classList.add("hidden");
    addSetBtn.disabled = false;
    addSetBtn.classList.remove("hidden");
  }
}

// addFirstWorkoutBtn.addEventListener("click", addWorkout.bind(this));

// addSetBtn.addEventListener("click", addSet);

// exreciseNameBtn.addEventListener("click", showWorkoutBody);

// allSetsSame.addEventListener("click", toggleAllSetsTheSame);

// addExreciseBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   this.parentElement.parentElement.insertAdjacentHTML("afterend", exreciseHtml);
//   createExrecice.call(this);
//   updateNewExrecise();
//   updateAddSetBtn();
// });

// function toggleAllSetsTheSame(e) {
//   const closestWorkoutBody = this.closest(".workout_body");
//   if (this.checked) {
//     closestWorkoutBody.querySelector(".sets").classList.remove("hidden");
//     closestWorkoutBody
//       .querySelector(".first_add_set_btn")
//       .classList.add("hidden");
//     closestWorkoutBody.querySelector(".first_add_set_btn").disabled = true;

//     closestWorkoutBody.querySelectorAll(".set").forEach((set) => {
//       if (!set.classList.contains("first_set")) set.remove();
//       console.log(set);
//     });
//   } else {
//     closestWorkoutBody.querySelector(".first_reps").classList.add("reps");
//     closestWorkoutBody.querySelector(".first_weight").classList.add("weight");
//     closestWorkoutBody.querySelector(".first_rest").classList.add("rest");

//     closestWorkoutBody.querySelector(".sets").classList.add("hidden");
//     closestWorkoutBody
//       .querySelector(".first_add_set_btn")
//       .classList.remove("hidden");
//     closestWorkoutBody.querySelector(".first_add_set_btn").disabled = false;
//   }
// }

// function createExrecice() {
//   let workoutBody = this.closest(".workout_body");
//   let exreciseName = workoutBody.querySelector(".exrecise_name");
//   updateNewExrecise();
//   updateAddSetBtn();
//   if (exreciseName.value) {
//     let exName = exreciseName.value;
//     const ex = new Exrecise(exName, this.closest(".workout_body"));
//     curExe = ex;
//     allWorkouts.find((v) => v == curWorkout).addExrecise(curExe);
//     console.log(workoutBody);
//     workoutBody.querySelector(".exercise_number").textContent =
//       allWorkouts.find((v) => v == curWorkout).exrecises.indexOf(curExe) +
//       1 +
//       ".";
//   } else alert("enter exrecise name");
// }

// function showWorkoutBody() {
//   workoutBodyMain =
//     this.closest(".workout_body").querySelector(".workout_body_main");
//   workoutBodyMain.classList.remove("hidden");
//   workoutBodyEnd.classList.remove("hidden");
// }

// function addWorkout(e) {
//   e.preventDefault();
//   if (workoutName.value) {
//     const w = new Workout(workoutName.value);
//     allWorkouts.push(w);
//     curWorkout = w;

//     workoutBody.classList.remove("hidden");
//     workoutName.remove();

//     workoutNameP.classList.remove("hidden");
//     workoutNameP.textContent = w.name;
//     createExrecice.bind(this);
//     showWorkoutBody.bind(this);
//   } else alert("enter the workout name");
// }

// function addSet(e) {
//   e.preventDefault();

//   workoutBodyMain =
//     this.closest(".workout_body").querySelector(".workout_body_main");

//   const reps = workoutBodyMain.querySelector(".reps");
//   const weight = workoutBodyMain.querySelector(".weight");
//   const rest = workoutBodyMain.querySelector(".rest");

//   const repsV = reps.value;
//   const weightV = weight.value;
//   const restV = rest.value;

//   const set = {
//     reps: repsV,
//     weight: weightV,
//     rest: restV,
//     div: this.parentElement,
//   };

//   allWorkouts
//     .find((v) => v == curWorkout)
//     .exrecises.find((ex) => ex === curExe)
//     .addSet(set);

//   console.log(allWorkouts);
//   this.parentElement.insertAdjacentHTML("afterend", setHtml);
//   hiddeAddSetBtn(this);

//   reps.classList.remove("reps");
//   weight.classList.remove("weight");
//   rest.classList.remove("rest");

//   updateAddSetBtn();
// }

// function updateAddSetBtn() {
//   let curAddSetBtn = document.querySelector(".add_set_btn");
//   curAddSetBtn.addEventListener("click", addSet);
//   document
//     .querySelectorAll(".add_set_btn")
//     .forEach((btn) => btn.addEventListener("click", addSet));
// }

// function hiddeAddSetBtn(btn) {
//   btn.classList.add("hidden");
//   btn.disabled = true;
//   btn.classList.remove("add_set_btn");
// }

// function updateNewExrecise() {
//   document
//     .querySelectorAll(".exrecise_name_btn")
//     .forEach((btn) => btn.addEventListener("click", createExrecice));
//   document
//     .querySelectorAll(".add_exercise_btn")
//     .forEach((btn) => btn.addEventListener("click", createExrecice));
// }
