// ======== Rovers´ Data ==============
var rover1 = {
  name: "R1",
  orientation: "N",
  x: 0,
  y: 0,
  travelLog: [[0, 0]]
};

var rover2 = {
  name: "R2",
  orientation: "S",
  x: 9,
  y: 9,
  travelLog: [[9, 9]]
};


// ============ Terrain =========================
var terrain = [
  [null, null, "crater", null, null, null, null, null, null, "hole"],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, "hole", null],
  [null, null, null, "water", "water", null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  ["crater", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, "hole", null, null, null],
  ["water", "alien", null, null, null, null, null, 'hole', null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "crater", null, null, null, null]
];


/*======= Compass Orientation =======
        N
    W       E
        S
*/


// ======== Orientation ==============
function turnLeft(rover) {
  console.log("Turning Left!");
  switch (rover.orientation) {
    case "N":
      rover.orientation = "W";
      break;
    case "W":
      rover.orientation = "S";
      break;
    case "S":
      rover.orientation = "E";
      break;
    case "E":
      rover.orientation = "N";
      break;
  }
  console.log("Orientation: " + rover.orientation);
}

function turnRight(rover) {
  console.log("Turning Right!");
  switch (rover.orientation) {
    case "N":
      rover.orientation = "E";
      break;
    case "E":
      rover.orientation = "S";
      break;
    case "S":
      rover.orientation = "W";
      break;
    case "W":
      rover.orientation = "N";
      break;
  }
  console.log("Orientation: " + rover.orientation);
}


// ============= Movement =================================
function moveForward(rover) {
  console.log("Moving Forward!");
  if (rover.orientation === "N" && rover.y > 0) {
    rover.y--;
  } else if (rover.orientation === "E" && rover.x < 9) {
    rover.x++;
  } else if (rover.orientation === "S" && rover.y < 9) {
    rover.y++;
  } else if (rover.orientation === "W" && rover.x > 0) {
    rover.x--;
  }
  if (checkTerrain(rover.y, rover.x)) {
    if (rover.orientation === "N") {
      rover.y++;
    } else if (rover.orientation === "E") {
      rover.x--;
    } else if (rover.orientation === "S") {
      rover.y--;
    } else if (rover.orientation === "W") {
      rover.x++;
    }
  } else {
    var lastX = rover.travelLog[rover.travelLog.length - 1][0];
    var lastY = rover.travelLog[rover.travelLog.length - 1][1];
    if (lastX === rover.x && lastY === rover.y) {
      console.log(rover.name + " is on planet´s edge");
    } else {
      rover.travelLog.push([rover.x, rover.y]);
    }
  }
}

function moveBackward(rover) {
  console.log("Moving Backward!");
  if (rover.orientation === "N" && rover.y < 9) {
    rover.y++;
  } else if (rover.orientation === "E" && rover.x > 0) {
    rover.x--;
  } else if (rover.orientation === "S" && rover.y > 0) {
    rover.y--;
  } else if (rover.orientation === "W" && rover.x < 9) {
    rover.x++;
  }
  if (checkTerrain(rover.y, rover.x)) {
    if (rover.orientation === "N") {
      rover.y--;
    } else if (rover.orientation === "E") {
      rover.x++;
    } else if (rover.orientation === "S") {
      rover.y++;
    } else if (rover.orientation === "W") {
      rover.x--;
    }
  } else {
    var lastX = rover.travelLog[rover.travelLog.length - 1][0];
    var lastY = rover.travelLog[rover.travelLog.length - 1][1];
    if (lastX === rover.x && lastY === rover.y) {
      console.log(rover.name + " is on planet´s edge");
    } else {
      rover.travelLog.push([rover.x, rover.y]);
    }
  }
}


// ======== Check if terrain is suitable ==============
function checkTerrain(x, y) {
  if (terrain[x][y] !== null) {
    console.log("Can´t pass because of a " + terrain[x][y]);
    return true;
  }
  return false;
}


// ======== Show where am I ==============
function status(rover) {
  console.log(
    rover.name +
      " Position: [" +
      rover.x +
      "," +
      rover.y +
      "] & Orientation: " +
      rover.orientation
  );
}


// ======== Display travel Log ==============
function travelLog(rover) {
  var message = "";
  for (var i = 0; i < rover.travelLog.length; i++) {
    message += "[" + rover.travelLog[i] + "], ";
  }
  console.log(
    rover.name + " has been in: " + message.slice(0, -2)
  );
}


// ============= Commands ===================
function commands(rover, order) {
  console.log(
    '\n==============================\n\t' + rover.name +
    ' receiving orders...\n==============================');
  var numberCommand = 1;
  for (var i = 0; i < order.length; i++) {
    console.log("Move #" + numberCommand++);
    switch (order[i]) {
      case "f":
        moveForward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      default:
        console.log("Order NOT correct, you have to use 'f', 'b', 'r' or 'l'");
    }
  }
  console.log(
    '==================== ' + rover.name +
    '´s Status Report ====================');
  status(rover);
  travelLog(rover);
  terrain[rover.x][rover.y] = rover.name;
}


//======== Orden given to the Rovers ========

commands(rover1, "rfflbffp");
commands(rover2, "fbrffrfl");