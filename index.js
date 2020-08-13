/*  this is for part1 */
var feedback = ["inferior", "terrfy", "normal", "good", "awesome"];
var rating = document.querySelector(".part1 ul");
var lis = document.querySelectorAll(".part1 li");
var myFeedback = document.querySelector(".part1 .txt");
var index = 0;
console.log(lis);
console.log(rating);
rating.onclick = function ({ target }) {
  Array.from(rating.children).map((element) => {
    element.classList.remove("selected");
  });
  target.classList.add("selected");
  var that = target;
  var count = 1;
  while (
    that.previousElementSibling &&
    that.previousElementSibling.tagName != null
  ) {
    that.previousElementSibling.classList.add("selected");
    that = that.previousElementSibling;
    count++;
  }
  myFeedback.innerHTML = feedback[count - 1];
};

/* adding a mouseleave event as if needed */
// rating.onmouseleave = function () {
//   Array.from(rating.children).map((element, index) => {
//     element.classList.remove("selected");
//   });
//   myFeedback.innerHTML = "";
// };
/*part 1 ends */

/*part2 */

/*part2 ends */
