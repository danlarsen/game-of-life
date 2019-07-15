const game = require("./game.js");
const assert = require("assert");

//#region Formatters
function boardToString(b, forDisp) {
    var ret = "";
    for(var y=0; y < b.length; y++) {
        var row = b[y];
        for(var x=0; x<row.length; x++) {
            var cell = row[x];
            if(cell)
                ret += "#";
            else
                ret += "-";
        }
        if(forDisp)
            ret += "\r\n";
        else
            ret += "_";
    }
    return ret;
}

function stringToBoard(s) {
    var ret = [];
    var row = [];

    for(var i=0; i<s.length; i++) {
        switch(s[i]) {
            case "-":
                row.push(false);
                break;
            case "#":
                row.push(true);
                break;
            case "_":
                ret.push(row);
                row = [];
                break;
        }
    }

    return ret;
}
//#endregion

var that = module.exports = {
    verifyBlinker(cnt) {
        if(!cnt)
            cnt = 10;

        var board = stringToBoard("---_###_---_");
        var otherBoard = stringToBoard("-#-_-#-_-#-_");

        var b = board;
        var expectAlt = true;
        for(var i=0; i < cnt; i++) {
            b = game.advanceState(b);
            assert.equal(boardToString(b), (expectAlt ? boardToString(otherBoard) : boardToString(board)), "Test failed (blinker), expected pattern not found on iteration " + i);
            expectAlt = !expectAlt;
        }
    },

    verifyBeehive(cnt) {
        if(!cnt)
            cnt = 10;

        var board = stringToBoard("------_--##--_-#--#-_--##--_------_");

        var b = board;

        for(var i=0; i < cnt; i++) {
            b = game.advanceState(b);
            assert.equal(boardToString(b), boardToString(board), "Test failed (beehive), something changed erroneously on iteration " + i);
        }
    },

    verifyGliderOnePass() {
        var startingBoard = stringToBoard("-----_--#--_---#-_-###-_-----_-----_-----_");
        var boardStates = [
            stringToBoard("-----_-----_-#-#-_--##-_--#--_-----_-----_"),
            stringToBoard("-----_-----_---#-_-#-#-_--##-_-----_-----_"),
            stringToBoard("-----_-----_--#--_---##_--##-_-----_-----_"),
            stringToBoard("-----_-----_---#-_----#_--###_-----_-----_")
        ];

        var b = startingBoard;

        for(var i=0; i < boardStates.length; i++) {
            b = game.advanceState(b);
            assert.equal(boardToString(b), boardToString(boardStates[i]), "Test failed (Glider (1 pass)), good luck (iteration: " + i + ")");
        }
    },

    runTestCycle() {
        that.verifyBlinker(100);
        console.log("Blinker verified (100 iterations)");
        that.verifyBeehive(100);
        console.log("Beehive verified (100 iterations)");
        that.verifyGliderOnePass();
        console.log("One pass Glider verified");
    }
}

that.runTestCycle();