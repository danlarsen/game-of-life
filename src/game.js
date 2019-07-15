var that = (module.exports = {
  makePoint(x, y) {
    return { x: x, y: y };
  },

  isAlive(x, y, points) {
    for (var i in points) {
      var pt = points[i];
      if (pt.x == x && pt.y == y) return true;
    }

    return false;
  },

  toggle(x, y, points) {
    var newPts = [];
    var removed = false;

    for (var i in points) {
      var pt = points[i];
      if (pt.x != x || pt.y != y) newPts.push(pt);
      else removed = true;
    }

    if (!removed) newPts.push(that.makePoint(x, y));

    return newPts;
  },

  countLivingNeighbors(x, y, pts) {
    var count = 0;

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (!dx && !dy) continue; //Don't count ourselves

        if (that.isAlive(x + dx, y + dy, pts)) count += 1;
      }
    }

    return count;
  },

  advanceState(width, height, points) {
    if (!width || !height) {
      console.error("Missing parameters to game.advanceState (sadtrombone)");
      return;
    }

    var oldPoints = points.slice(0);
    var diff = 0;

    //This could be more efficient but I am getting bored
    var hashMapsInJSAreFun = {};
    for (var i in points) {
      var pt = points[i];
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          var fX = pt.x + dx,
            fY = pt.y + dy;

          //Making the point over again cheaper than O(N)ing through the hashset each time
          hashMapsInJSAreFun[fX + "," + fY] = that.makePoint(fX, fY);
        }
      }
    }

    var cellCount = 0;
    for (var key in hashMapsInJSAreFun) {
      if (hashMapsInJSAreFun.hasOwnProperty(key)) {
        cellCount += 1;
        var pt = hashMapsInJSAreFun[key];
        var x = pt.x,
          y = pt.y;

        var cell = that.isAlive(x, y, oldPoints);
        var neighbors = that.countLivingNeighbors(x, y, oldPoints);

        if (cell) {
          //IT'S ALIVE!
          //Rule 1) Any live cell with fewer than two live neighbours dies
          if (neighbors < 2 || neighbors > 3) {
            points = that.toggle(x, y, points);
            diff += 1;
          }
        } else {
          //It's dead Jim
          //Rule 4)  Dead cells with exactly 3 live neighbors come to life
          if (neighbors == 3) {
            points = that.toggle(x, y, points);
            diff += 1;
          }
        }
      }
    }

    if (diff)
      console.log(
        diff +
          " toggles occured in simulation, considered total of " +
          cellCount +
          " cells."
      );

    return points;
  },

  extractBoard(width, height, points) {
    if (!width || !height) {
      console.error("Missing parameters to game.extractBoard");
      return;
    }

    var board = [];
    for (var y = 0; y < height; y++) {
      var row = [];

      for (var x = 0; x < width; x++) {
        row.push(that.isAlive(x, y, points));
      }
      board.push(row);
    }

    return board;
  }
});
