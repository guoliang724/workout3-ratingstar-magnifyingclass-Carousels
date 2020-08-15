/*  this is for part1 */
(function () {
  var feedback = [
    "highly disatisfied",
    "neutral",
    "normal",
    "satisfied",
    "awesome",
  ];
  var rating = document.querySelector(".part1 ul");
  var lis = document.querySelectorAll(".part1 li");
  var myFeedback = document.querySelector(".part1 .txt");
  var index = 0;
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
})();

/*part2 */
(function () {
  var smalldiv = document.querySelector(".main .smalldiv");
  var bigdiv = document.querySelector(".main .bigdiv");
  var movediv = document.querySelector(".main .movediv");
  var smalldivstyle = getComputedStyle(smalldiv);
  var bigdivstyle = getComputedStyle(bigdiv);
  var movedivstyle = getComputedStyle(movediv);

  smalldiv.onmousemove = function (e) {
    bigdiv.style.display = "block";
    movediv.style.display = "block";
    var offset = offSetFunc(e);
    setPostion(offset);
    bigDivAjustment();
  };
  smalldiv.onmouseleave = function () {
    bigdiv.style.display = "none";
    movediv.style.display = "none";
  };
  /**
   * calulate the offsetX and offsetY
   */
  function offSetFunc(e) {
    if (e.target === smalldiv) {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    } else {
      return {
        x: parseFloat(movedivstyle.left) + e.offsetX,
        y: parseFloat(movedivstyle.top) + e.offsetY,
      };
    }
  }
  /**
   * set position
   */
  function setPostion(offset) {
    var left = offset.x - parseFloat(movedivstyle.width) / 2;
    var top = offset.y - parseFloat(movedivstyle.height) / 2;
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left > parseFloat(smalldivstyle.width) - parseFloat(movedivstyle.width))
      left = parseFloat(smalldivstyle.width) - parseFloat(movedivstyle.width);
    if (
      top >
      parseFloat(smalldivstyle.height) - parseFloat(movedivstyle.height)
    )
      top = parseFloat(smalldivstyle.height) - parseFloat(movedivstyle.height);
    movediv.style.left = left + "px";
    movediv.style.top = top + "px";
  }
  /**
   * bigdiv adjustment
   */
  function bigDivAjustment() {
    var leftPercent =
      parseFloat(movedivstyle.left) / parseFloat(smalldivstyle.width);

    var topPercent =
      parseFloat(movedivstyle.top) / parseFloat(smalldivstyle.height);
    bigdiv.style.backgroundPosition = `${-800 * leftPercent}px ${
      -800 * topPercent
    }px`;
  }
})();
/*part2 ends */
