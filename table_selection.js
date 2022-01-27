// Dimensions the table positions are referring to
restaurant_dimensions = { width: 1800, height: 1400 };
restaurant_areas = [
    {x:  48, y:  41, width:  711, height: 786}, // Area 0: Top left indoors
    {x:  41, y: 834, width: 1718, height: 529}, // Area 1: Bottom outdoors
    {x: 766, y: 266, width:  986, height: 561}, // Area 2: Top right indoors (with a bar)
]
restaurant_tables_unmoved = [
    {x:   92, y:   41, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  0
    {x:  260, y:   41, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  1
    {x:  428, y:   41, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  2
    {x:  596, y:   41, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  3
    {x:   47, y:  202, width:  70, height: 120, seats: 2, orient: "hori", area: 0}, //  4
    {x:   47, y:  402, width:  70, height: 120, seats: 2, orient: "hori", area: 0}, //  5
    {x:   47, y:  602, width:  70, height: 120, seats: 2, orient: "hori", area: 0}, //  6
    {x:  404, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  7
    {x:  590, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 0}, //  8
    {x:  363, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 0}, //  9
    {x:  363, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 0}, // 10
    {x:  609, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 0}, // 11
    {x:  609, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 0}, // 12
    {x:   41, y:  958, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 13
    {x:   41, y: 1158, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 14
    {x:  324, y:  958, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 15
    {x:  324, y: 1158, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 16
    {x:  548, y:  920, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 17
    {x:  818, y:  920, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 18
    {x:  548, y: 1160, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 19
    {x:  818, y: 1160, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 20
    {x: 1056, y:  958, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 21
    {x: 1056, y: 1158, width:  70, height: 120, seats: 2, orient: "hori", area: 1}, // 22
    {x: 1471, y:  920, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 23
    {x: 1471, y: 1160, width: 120, height: 150, seats: 4, orient: "vert", area: 1}, // 24
    {x:  766, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 25
    {x:  766, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 26
    {x: 1012, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 27
    {x: 1012, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 28
    {x: 1356, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 29
    {x: 1356, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 30
    {x: 1602, y:  367, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 31
    {x: 1602, y:  567, width: 150, height: 120, seats: 4, orient: "hori", area: 2}, // 32
    {x:  831, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 2}, // 33
    {x: 1017, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 2}, // 34
    {x: 1381, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 2}, // 35
    {x: 1567, y:  757, width: 120, height:  70, seats: 2, orient: "vert", area: 2}, // 36
// Bar seats should probably not be reservable?
//    {x: 1022, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1107, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1192, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1277, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1362, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1447, y:  178, width:  50, height:  50, seats: 1, area: 2},
];
restaurant_tables_moved = JSON.parse(JSON.stringify(restaurant_tables_unmoved)); // Deep copy


// Table selection states
var tsOccupiedTableIDs = []; // Which tables are not available
var tsSelectedTableIDs = []; // Which tables were selected
var tsHoveredTableID  = -1; // Which table the mouse is over
// Mouse input states
const TS_MIN_TABLE_DRAG_DISTANCE = 0.02;
var tsMouseDraggingTable = false; // If we're dragging a table
var tsMouseDragTableStartPos   = null; // Where we started dragging
var tsMouseDragTableCurrentPos = null; // Current mouse pos during dragging
var tsMouseDragTableIdx = -1; // Which table we're dragging
var tsMouseDragTableObjPreview = null;

// Table positions refer to a restaurant size that might be different from
// the displayed restaurant image's size -> Use scale factor
var tsHoriScale = 1.0;
var tsVertScale = 1.0;
var tsCanvas = document.getElementById("table-selection-canvas");
var tsImgObj = new Image();
tsImgObj.onload = function() {
    // Set canvas's size to the size of the now loaded image
    tsCanvas.width  = tsImgObj.width;
    tsCanvas.height = tsImgObj.height;
    tsHoriScale = tsImgObj.width  / restaurant_dimensions.width;
    tsVertScale = tsImgObj.height / restaurant_dimensions.height;
    // Determine occupied tables
    for(let i = 0; i < restaurant_tables_unmoved.length; i++) {
        if(Math.random() < 0.5) // 50 % chance per table to be occupied
            tsOccupiedTableIDs.push(i);
    }
    // Draw!
    drawTableSelectionCanvas();
};
tsImgObj.src = "public/images/restaurant.png";

tsCanvas.addEventListener("mousedown", function(e) {
    var clickPos = getCanvasMouseCoords(e.pageX, e.pageY);
    let selectedTableID = getClosestAvailableTableID(clickPos.x, clickPos.y);
    if(selectedTableID == -1) return;
    
    tsMouseDraggingTable = true;
    tsMouseDragTableStartPos = clickPos;
    tsMouseDragTableCurrentPos = clickPos;
    tsMouseDragTableIdx = selectedTableID;
    tsMouseDragTableObjPreview = JSON.parse(JSON.stringify(restaurant_tables_moved[selectedTableID])); // Clone table object

    drawTableSelectionCanvas();
});
tsCanvas.addEventListener("mouseup", function(e) {
    if(!tsMouseDraggingTable) return;
    var dropPos = getCanvasMouseCoords(e.pageX, e.pageY);
    
    if(tsMouseDraggingTable) {

        let dragDistX = tsImgObj.width  * (dropPos.x - tsMouseDragTableStartPos.x);
        let dragDistY = tsImgObj.height * (dropPos.y - tsMouseDragTableStartPos.y);
        let dragDist = Math.sqrt(dragDistX*dragDistX + dragDistY*dragDistY);
        var tsImgDiagonalLength = Math.sqrt(tsImgObj.width*tsImgObj.width + tsImgObj.height*tsImgObj.height);
        if(dragDist > tsImgDiagonalLength * TS_MIN_TABLE_DRAG_DISTANCE) {
            let movedTablePreviewObj = calcTableMove(tsMouseDragTableIdx, dropPos.x, dropPos.y);
            if(movedTablePreviewObj === null) {
                // nothing
            } else {
                restaurant_tables_moved[tsMouseDragTableIdx] = movedTablePreviewObj;
            }
        } else {
            let search_result = tsSelectedTableIDs.indexOf(tsMouseDragTableIdx);
            if(search_result == -1) // If selected table wasn't selected before
                tsSelectedTableIDs.push(tsMouseDragTableIdx);
            else // If selected table was already selected before -> deselect it
                tsSelectedTableIDs.splice(search_result, 1); // Remove table id from list
        }
        
        tsMouseDraggingTable = false;
    }

    drawTableSelectionCanvas();

    // Let the rest of the webpage know which tables were selected
    let seatCount = 0;
    for(let i = 0; i < tsSelectedTableIDs.length; i++)
        seatCount += restaurant_tables_moved[tsSelectedTableIDs[i]].seats;
    selectTables(tsSelectedTableIDs, seatCount);
});
tsCanvas.addEventListener("mousemove", function(e) {
    var movePos = getCanvasMouseCoords(e.pageX, e.pageY);

    if(tsMouseDraggingTable) {
        tsHoveredTableID = -1;
        tsMouseDragTableCurrentPos = movePos;
        
        let movedTablePreviewObj = calcTableMove(tsMouseDragTableIdx, movePos.x, movePos.y);
        if(movedTablePreviewObj === null) {
            tsMouseDragTableObjPreview.x = movePos.x * tsImgObj.width  - (tsMouseDragTableObjPreview.width  * tsHoriScale / 2);
            tsMouseDragTableObjPreview.y = movePos.y * tsImgObj.height - (tsMouseDragTableObjPreview.height * tsVertScale / 2);
        } else {
            tsMouseDragTableObjPreview = movedTablePreviewObj
        }
    } else {
        tsHoveredTableID = getClosestAvailableTableID(movePos.x, movePos.y);
    }

    drawTableSelectionCanvas();
});
tsCanvas.addEventListener("mouseleave", function() {
    tsHoveredTableID = -1;
    tsMouseDraggingTable = false;
    drawTableSelectionCanvas();
});

function getCanvasMouseCoords(pageMousePosX, pageMousePosY) {
    // Canvas Bounding Box (it's affected by page scroll)
    var canvasBBox = tsCanvas.getBoundingClientRect();
    // X,Y mouse positions on the canvas element ranging from [0,0] (top left) to [1.0,1.0] (bottom right)
    var mousePosRelX = (pageMousePosX - (canvasBBox.left + window.pageXOffset)) / canvasBBox.width;
    var mousePosRelY = (pageMousePosY - (canvasBBox.top  + window.pageYOffset)) / canvasBBox.height;
    return { x: mousePosRelX, y: mousePosRelY };
}

function getClosestAvailableTableID(relativePosX, relativePosY) {
    // Scale our position range [0.0, 1.0] to [0.0, width or height]
    relativePosX = relativePosX * restaurant_dimensions.width;
    relativePosY = relativePosY * restaurant_dimensions.height;

    var closestTableID = -1;
    var closestTableDistSquared;
    for(let i = 0; i < restaurant_tables_moved.length; i++) {
        // Skip table if it's occupied
        if(tsOccupiedTableIDs.indexOf(i) != -1)
            continue;
        
        let table = restaurant_tables_moved[i];

        let xDist = 0.0;
        if(relativePosX < table.x)
            xDist = table.x - relativePosX;
        else if(relativePosX > table.x + table.width)
            xDist = relativePosX - (table.x + table.width);
        
        let yDist = 0.0;
        if(relativePosY < table.y)
            yDist = table.y - relativePosY;
        else if(relativePosY > table.y + table.height)
            yDist = relativePosY - (table.y + table.height);

        let tableDistSquared = xDist*xDist + yDist*yDist;
        if(closestTableID == -1 || tableDistSquared < closestTableDistSquared) {
            closestTableID = i;
            closestTableDistSquared = tableDistSquared;
        }
    }
    return closestTableID;
}

// Returns null, if table doesn't get moved. Returns moved table object, if it was moved
function calcTableMove(movedTableIdx, tableDropPositionX, tableDropPositionY) {
    let tableToMove = JSON.parse(JSON.stringify(restaurant_tables_moved[movedTableIdx])); // Copy table object
    let tableToConnectToIdx = getClosestAvailableTableID(tableDropPositionX, tableDropPositionY);
    
    if(tableToConnectToIdx == -1 || tableToConnectToIdx == movedTableIdx) return null
    let tableToConnectTo = restaurant_tables_moved[tableToConnectToIdx];
    if(tableToConnectTo.area != tableToMove.area) return null;

    if(tableToMove.orient.localeCompare(tableToConnectTo.orient) != 0) {
        if(tableToMove.orient.localeCompare("hori") == 0) tableToMove.orient = "vert";
        else                                              tableToMove.orient = "hori";
        let buf = tableToMove.width;
        tableToMove.width = tableToMove.height;
        tableToMove.height = buf;
    }

    if(tableToConnectTo.orient.localeCompare("hori") == 0) {
        let connectLeft = tableDropPositionX*tsImgObj.width < ((tableToConnectTo.x + tableToConnectTo.width/2) / restaurant_dimensions.width);
        
        let tableCenterY = tableToConnectTo.y + tableToConnectTo.height / 2;
        tableToMove.y = tableCenterY - tableToMove.height / 2;
        if(connectLeft) {
            tableToMove.x = tableToConnectTo.x - tableToMove.width;
        } else { // connectRight
            tableToMove.x = tableToConnectTo.x + tableToConnectTo.width;
        }
    } else { // tableToConnectTo.orient.localeCompare("vert") == 0
        let connectAbove = tableDropPositionY*tsImgObj.height < ((tableToConnectTo.y + tableToConnectTo.height/2) / restaurant_dimensions.height);

        let tableCenterX = tableToConnectTo.x + tableToConnectTo.width / 2;
        tableToMove.x = tableCenterX - tableToMove.width / 2;
        if(connectAbove) {
            tableToMove.y = tableToConnectTo.y - tableToMove.height;
        } else { // connectBelow
            tableToMove.y = tableToConnectTo.y + tableToConnectTo.height;
        }
    }

    // Check if moved table is still in it's area
    let area = restaurant_areas[tableToMove.area];
    if(tableToMove.x < area.x || tableToMove.y < area.y) return null;
    if(tableToMove.x + tableToMove.width  > area.x + area.width ) return null;
    if(tableToMove.y + tableToMove.height > area.y + area.height) return null;
    
    // Check if moved table intersects with any table 
    for(let i = 0; i < restaurant_tables_moved.length; i++) {
        if(i == movedTableIdx) continue;
        let intersectTable = restaurant_tables_moved[i];

        if(intersectTable.area != tableToMove.area) continue;

        let leftSideInXRange   = (tableToMove.x > intersectTable.x && tableToMove.x < intersectTable.x + intersectTable.width);
        let rightSideInXRange  = (intersectTable.x > tableToMove.x && intersectTable.x < tableToMove.x + tableToMove.width);
        let topSideInYRange    = (tableToMove.y > intersectTable.y && tableToMove.y < intersectTable.y + intersectTable.height);
        let bottomSideInYRange = (intersectTable.y > tableToMove.y && intersectTable.y < tableToMove.y + tableToMove.height);
        if((leftSideInXRange || rightSideInXRange) && (topSideInYRange || bottomSideInYRange)) // tables intersect
            return null;
    }
    return tableToMove;
}

function eraseUnmovedTablePos(tableIdx) {
    var ctx = tsCanvas.getContext("2d");
    var table = restaurant_tables_unmoved[tableIdx];
    let x = table.x * tsHoriScale;
    let y = table.y * tsVertScale;
    let w = table.width  * tsHoriScale;
    let h = table.height * tsVertScale;
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(x, y, w, h);
}

function drawMovedTable(tableIdx, x, y) {
    eraseUnmovedTablePos(tableIdx);
    var ctx = tsCanvas.getContext("2d");
    let table = restaurant_tables_unmoved[tableIdx];
    let sx = table.x * tsHoriScale;
    let sy = table.y * tsVertScale;
    let sw = table.width  * tsHoriScale;
    let sh = table.height * tsVertScale;
    ctx.drawImage(tsImgObj, sx, sy, sw, sh, x, y, sw, sh);
}

function drawMovedTableRotated(tableIdx, x, y) {
    eraseUnmovedTablePos(tableIdx);
    var ctx = tsCanvas.getContext("2d");
    let table = restaurant_tables_unmoved[tableIdx];
    let sx = table.x * tsHoriScale;
    let sy = table.y * tsVertScale;
    let sw = table.width  * tsHoriScale;
    let sh = table.height * tsVertScale;
    ctx.save();
    ctx.translate(sx, sy + sh); // Rotate at bottom left table corner
    ctx.rotate(Math.PI/2.0); // 90 degrees
    let newCtxX = y - sy - sh;
    let newCtxY = sx - x - sh;
    ctx.drawImage(tsImgObj, sx, sy, sw, sh, newCtxX, newCtxY, sw, sh);
    ctx.restore();
}

function drawTableSelectionCanvas() {
    var ctx = tsCanvas.getContext("2d");
    ctx.drawImage(tsImgObj, 0, 0, tsImgObj.width, tsImgObj.height); // Background image

    // Determine drawing values from the image size
    var tsImgDiagonalLength = Math.sqrt(tsImgObj.width*tsImgObj.width + tsImgObj.height*tsImgObj.height);
    var tableBoxPadding = tsImgDiagonalLength * 0.005;
    ctx.lineWidth = tsImgDiagonalLength * 0.005;
    
    // Draw every moved table
    for(let i = 0; i < restaurant_tables_moved.length; i++) {
        if(tsMouseDraggingTable && i == tsMouseDragTableIdx) continue;
        let movedTable = restaurant_tables_moved[i];
        if(movedTable.orient.localeCompare(restaurant_tables_unmoved[i].orient) != 0) {
            drawMovedTableRotated(tsMouseDragTableIdx, movedTable.x, movedTable.y);
        } else {
            drawMovedTable(i, movedTable.x, movedTable.y);
        }
    }

    // Draw occupied tables
    for(let i = 0; i < tsOccupiedTableIDs.length; i++) {
        let occTable = restaurant_tables_unmoved[tsOccupiedTableIDs[i]];
        let x = (occTable.x - tableBoxPadding) * tsHoriScale;
        let y = (occTable.y - tableBoxPadding) * tsVertScale;
        let w = (occTable.width  + 2 * tableBoxPadding) * tsHoriScale;
        let h = (occTable.height + 2 * tableBoxPadding) * tsVertScale;
        // Draw filled transparent rect
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fillRect(x, y, w, h);
        // Draw rectangle border
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.strokeRect(x, y, w, h);
        // Draw 2 diagonal lines
        ctx.beginPath();
        ctx.moveTo(x, y  ); ctx.lineTo(x + w, y + h);
        ctx.moveTo(x, y+h); ctx.lineTo(x + w, y    );
        ctx.closePath();
        ctx.stroke();
    }
    // Draw selected tables
    for(let i = 0; i < tsSelectedTableIDs.length; i++) {
        // TODO don't draw table being dragged
        var table = restaurant_tables_moved[tsSelectedTableIDs[i]];
        let x = (table.x - tableBoxPadding) * tsHoriScale;
        let y = (table.y - tableBoxPadding) * tsVertScale;
        let w = (table.width  + 2 * tableBoxPadding) * tsHoriScale;
        let h = (table.height + 2 * tableBoxPadding) * tsVertScale;
        // Draw filled transparent rect
        ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
        ctx.fillRect(x, y, w, h);
        // Draw rectangle border
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
        ctx.strokeRect(x, y, w, h);
    }
    // Draw hovered-over table
    let isHoveredTableAvailable = tsOccupiedTableIDs.indexOf(tsHoveredTableID) == -1;
    if(tsHoveredTableID != -1 && isHoveredTableAvailable) {
        var table = restaurant_tables_moved[tsHoveredTableID];
        let x = (table.x - tableBoxPadding) * tsHoriScale;
        let y = (table.y - tableBoxPadding) * tsVertScale;
        let w = (table.width  + 2 * tableBoxPadding) * tsHoriScale;
        let h = (table.height + 2 * tableBoxPadding) * tsVertScale;
        // Draw filled transparent rect
        ctx.fillStyle = 'rgba(0, 114, 76, 0.15)';
        ctx.fillRect(x, y, w, h);
        // Draw rectangle border
        ctx.strokeStyle = 'rgba(0, 114, 76, 0.8)';
        ctx.strokeRect(x, y, w, h);
    }

    // Draw table being dragged
    if(tsMouseDraggingTable) {
        let dragDistX = tsImgObj.width  * (tsMouseDragTableCurrentPos.x - tsMouseDragTableStartPos.x);
        let dragDistY = tsImgObj.height * (tsMouseDragTableCurrentPos.y - tsMouseDragTableStartPos.y);
        let dragDist = Math.sqrt(dragDistX*dragDistX + dragDistY*dragDistY);
        if(dragDist > tsImgDiagonalLength * TS_MIN_TABLE_DRAG_DISTANCE) {
            if(tsMouseDragTableObjPreview.orient.localeCompare(restaurant_tables_unmoved[tsMouseDragTableIdx].orient) != 0) {
                drawMovedTableRotated(tsMouseDragTableIdx, tsMouseDragTableObjPreview.x, tsMouseDragTableObjPreview.y);
            } else {
                drawMovedTable(tsMouseDragTableIdx, tsMouseDragTableObjPreview.x, tsMouseDragTableObjPreview.y);
            }
        }
    }
}
