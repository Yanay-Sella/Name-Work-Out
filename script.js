"use strict";

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

            <button class="add_set_btn">new set</button>
            <label class="switch">
              all sets the same
              <input class="all_sets_same" type="checkbox" />
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
              new exercise
            </button>
          </div>
          `;

const workoutHtml = `
  <div class="workout">
      <div class="workout_header">
        <button class="create_workout_btn">create workout</button>
        <input
          class="workout_name"
          type="text"
          placeholder="Name Of The Workout"
        />
        <p class="workout_name_p hidden"></p>
        <button class = "open_close_btn">open/close</button>
      </div>
      <div class="workout_body hidden ">
      </div
      <div> 
      <button class="new_workout_btn" style="font-size: 20px; width: fit-content; height: fit-content" > new workout </button>
      </div>
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
createWorkout.call(document.body);
addEventListener;

function createWorkout() {
  let newWorkout;
  if (this === document.body) {
    this.insertAdjacentHTML("afterbegin", workoutHtml);
    this.querySelector(".new_workout_btn").addEventListener(
      "click",
      createWorkout
    );
    newWorkout = this.querySelector(".workout");
    this.querySelector(".create_workout_btn").addEventListener(
      "click",
      createExercise
    );
    this.querySelector(".open_close_btn").addEventListener(
      "click",
      setupOpenCloseBtn
    );
    // newWorkout.querySelector(".new_workout_btn").remove();
  } else if (this.classList.contains("new_workout_btn")) {
    this.closest(".workout").insertAdjacentHTML("afterend", workoutHtml);
    newWorkout = this.closest(".workout").nextElementSibling;
    newWorkout
      .querySelector(".new_workout_btn")
      .addEventListener("click", createWorkout);
    newWorkout
      .querySelector(".create_workout_btn")
      .addEventListener("click", createExercise);
    newWorkout
      .querySelector(".open_close_btn")
      .addEventListener("click", setupOpenCloseBtn);

    this.remove();
  }

  // allWorkouts.push({
  //   name: newWorkout.querySelector(".workout_name").value,
  //   exercises: [],
  //   div: newWorkout.querySelector(".workout"),
  // });
}

function createExercise() {
  console.log(this);
  let workoutBody = this.closest(".workout").querySelector(".workout_body");
  workoutBody.classList.remove("hidden");
  if (!workoutBody) {
    workoutBody = this.closest(".workout").querySelector(".workout_body");
  }

  //   let workoutBody = this.closest(".workout").querySelector(".workout_body");
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

  // setupAllSetsSameBtn.call(workoutBody.querySelector(".switch"));

  let curExerciseDiv = [...workoutBody.querySelectorAll(".exercise")].slice(
    -1
  )[0];

  setExerciseNumber(curExerciseDiv);

  // allWorkouts
  //   .find((el) => el.div === this.closest(".workout"))
  //   .exercises.push({
  //     name: getCurValue(workoutBody, "exercise_name", ".exercise"),
  //     div: curExerciseDiv,
  //     sets: [],
  //   });

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

  // allWorkouts
  //   .find((el) => el.div === exerciseBodyMain.closest(".workout"))
  //   .exercises.find((el) => el.div === exerciseBodyMain.closest(".exercise"))
  //   .sets.push({
  //     reps: curReps,
  //     weight: curWeight,
  //     rest: curRest,
  //     div: curSetDiv,
  //   });

  setupAllSetsSameBtn.bind(this);
}

function getCurValue(ebm, val, type = ".set") {
  return [...ebm.querySelectorAll(type)].slice(-2)[0].querySelector(`.${val}`)
    .value;
}

function setupAllSetsSameBtn() {
  const exerciseBodyMain = this.closest(".exercise").querySelector(
    ".exercise_body_main"
  );
  const addSetBtn = exerciseBodyMain
    .closest(".exercise")
    .querySelector(".add_set_btn");

  const btn = this.querySelector(".all_sets_same");

  if (btn.checked) {
    exerciseBodyMain.querySelectorAll(".set").forEach((set, i, arr) => {
      if (i >= 1) {
        set.remove();
        set.querySelector(".sets").classList.remove("hidden");
      } else if (arr.length === 0) createSet();
      else set.querySelector(".sets").classList.remove("hidden");
    });

    addSetBtn.disabled = true;
    addSetBtn.classList.add("hidden");
    // set.querySelector(".sets").classList.remove("hidden");
  } else if (!btn.checked) {
    exerciseBodyMain.querySelectorAll(".set").length === 0
      ? createSet.call(this)
      : console.log("not 0 sets");
    exerciseBodyMain.querySelector(".sets").classList.add("hidden");
    addSetBtn.disabled = false;
    addSetBtn.classList.remove("hidden");
  }
}

function setExerciseNumber(ex) {
  let numExercises = ex
    .closest(".workout_body")
    .querySelectorAll(".exercise").length;
  ex.querySelector(".exercise_number").textContent = numExercises + ".";
}

function setupOpenCloseBtn() {
  const workoutBody = this.closest(".workout").querySelector(".workout_body");

  if (workoutBody.style.display === "none") {
    workoutBody.style.display = "block";
  } else {
    workoutBody.style.display = "none";
  }
}
