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

/*part3*/
(function () {
  config = {
    imgWidth: 520,
    imgHeight: 280,
    currentIndex: 0,
    bannerDiv: document.querySelector(".banner"),
    imgDiv: document.querySelector(".banner .images"),
    dotDiv: document.querySelector(".banner .dots"),
    arrowDiv: document.querySelector(".banner .arrows"),
  };
  config.imgNumber = config.imgDiv.children.length;

  /*intial sizes */
  function initalDots() {
    for (var i = 0; i < config.imgNumber; i++) {
      var span = document.createElement("span");
      config.dotDiv.appendChild(span);
    }
    intialSelected();
  }

  /*intial selected dot */
  function intialSelected() {
    for (var i = 0; i < config.imgNumber; i++) {
      if (i === config.currentIndex) {
        config.dotDiv.children[i].classList.add("selected");
      } else {
        config.dotDiv.children[i].classList.remove("selected");
      }
    }
  }
  /*initial the total size of pics */
  function initalSize() {
    config.imgDiv.style.width = config.imgNumber * config.imgWidth + "px";
  }

  /*initial positon */
  function intialPositon() {
    config.imgDiv.style.marginLeft =
      -config.currentIndex * config.imgWidth + "px";
  }

  /* the function of switching pic */
  function switchPic(index) {
    if (index == config.currentIndex) {
      return;
    }
    config.imgDiv.style.marginLeft = -index * config.imgWidth + "px";
    /*set index to be equal to currentIndex */
    config.currentIndex = index;
  }

  /*register click event on left and right button */
  config.arrowDiv.onclick = function (e) {
    if (e.target.classList.contains("left")) {
      var index = config.currentIndex - 1;
      if (index < 0) {
        index = config.imgNumber - 1;
        config.imgDiv.classList.add("faster");
      } else {
        console.log("enter else");
        config.imgDiv.classList.remove("faster");
      }
    } else {
      var index = config.currentIndex + 1;
      if (index > config.imgNumber - 1) {
        index = 0;
        config.imgDiv.classList.add("faster");
      } else {
        config.imgDiv.classList.remove("faster");
      }
    }
    switchPic(index);
    config.currentIndex = index;
    intialSelected();
  };

  /*register click event on dot */
  config.dotDiv.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
      var index = Array.from(config.dotDiv.children).indexOf(e.target);
      switchPic(index);
      config.currentIndex = index;
      intialSelected();
    }
  };
  /*automatically rolling */
  function rolling() {
    stopRolling();
    config.timer = setInterval(function () {
      var index = config.currentIndex;
      index++;
      if (index == config.imgNumber - 1) {
        index = 0;
        config.imgDiv.classList.add("faster");
      } else {
        config.imgDiv.classList.remove("faster");
      }
      switchPic(index);
      intialSelected();
    }, 1000);
  }
  /*stop rolling */
  function stopRolling() {
    clearInterval(config.timer);
    config.timer = null;
  }

  /* register a move in/out event*/
  config.bannerDiv.onmouseenter = function () {
    stopRolling();
  };
  config.bannerDiv.onmouseleave = function () {
    rolling();
  };

  /* intial all */
  function intialAll() {
    initalSize();
    intialPositon();
    initalDots();
    rolling();
  }
  intialAll();
})();

/* part3 ends*/
