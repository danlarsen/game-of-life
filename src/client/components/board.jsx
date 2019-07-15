import React from "react";
import game from "game";
import { useSharedState } from "@retrium/react-sharedb";

export default function Board() {
  var height = 30,
    width = 30;

  var [points, setPoints] = useSharedState("collection", "doc");

  const toggleCell = event => {
    const x = parseInt(event.target.getAttribute("data-x"), 10);
    const y = parseInt(event.target.getAttribute("data-y"), 10);
    var idx = points.findIndex(v => {
      return v.x == x && v.y == y;
    });
    if (idx > -1) {
      setPoints({
        p: [idx],
        ld: points[idx]
      });
    } else {
      setPoints({
        p: [0],
        li: game.makePoint(x, y)
      });
    }
  };

  var board = game.extractBoard(width, height, points);
  var rows = [];
  var idx = 0;
  for (var x = 0; x < width; x++) {
    var children = [];
    for (var y = 0; y < height; y++) {
      var cell = board[y][x];
      children.push(
        <td
          onClick={toggleCell}
          data-x={x}
          data-y={y}
          key={idx++}
          className={cell ? "game-cell alive" : "game-cell dead"}
        >
          {" "}
        </td>
      );
    }
    rows.push(<tr key={idx++}>{children}</tr>);
  }

  var onTick = () => {
    setPoints({
      p: [],
      oi: game.advanceState(width, height, points)
    });
  };

  return (
    <div>
      <div className="left-bar">
        <table className="game-board">
          <tbody>{rows}</tbody>
        </table>
      </div>
      <div className="right-bar">
        <button onClick={onTick}>Advance one Frame</button>
      </div>
    </div>
  );
}
