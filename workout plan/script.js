function setUpButtons() {
  $(".returnHome")
    .off("click")
    .click(() => {
      window.location.href = "../home page/home.html";
    });
}
setUpButtons();
