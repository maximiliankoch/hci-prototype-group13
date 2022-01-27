// Area 0: Top left indoors
// Area 1: Bottom outdoors
// Area 2: Top right indoors (with a bar)

// Dimensions the table positions are referring to
restaurant_dimensions = { width: 1800, height: 1400 };
restaurant_tables = [
    {x:   92, y:   41, width: 120, height:  70, seats: 2, area: 0},
    {x:  260, y:   41, width: 120, height:  70, seats: 2, area: 0},
    {x:  428, y:   41, width: 120, height:  70, seats: 2, area: 0},
    {x:  596, y:   41, width: 120, height:  70, seats: 2, area: 0},
    {x:   47, y:  202, width:  70, height: 120, seats: 2, area: 0},
    {x:   47, y:  402, width:  70, height: 120, seats: 2, area: 0},
    {x:   47, y:  602, width:  70, height: 120, seats: 2, area: 0},
    {x:  404, y:  757, width: 120, height:  70, seats: 2, area: 0},
    {x:  590, y:  757, width: 120, height:  70, seats: 2, area: 0},
    {x:  363, y:  367, width: 150, height: 120, seats: 4, area: 0},
    {x:  363, y:  567, width: 150, height: 120, seats: 4, area: 0},
    {x:  609, y:  367, width: 150, height: 120, seats: 4, area: 0},
    {x:  609, y:  567, width: 150, height: 120, seats: 4, area: 0},
    {x:   41, y:  958, width:  70, height: 120, seats: 2, area: 1},
    {x:   41, y: 1158, width:  70, height: 120, seats: 2, area: 1},
    {x:  324, y:  958, width:  70, height: 120, seats: 2, area: 1},
    {x:  324, y: 1158, width:  70, height: 120, seats: 2, area: 1},
    {x:  548, y:  920, width: 120, height: 150, seats: 4, area: 1},
    {x:  818, y:  920, width: 120, height: 150, seats: 4, area: 1},
    {x:  548, y: 1160, width: 120, height: 150, seats: 4, area: 1},
    {x:  818, y: 1160, width: 120, height: 150, seats: 4, area: 1},
    {x: 1056, y:  958, width:  70, height: 120, seats: 2, area: 1},
    {x: 1056, y: 1158, width:  70, height: 120, seats: 2, area: 1},
    {x: 1471, y:  920, width: 120, height: 150, seats: 4, area: 1},
    {x: 1471, y: 1160, width: 120, height: 150, seats: 4, area: 1},
    {x:  766, y:  367, width: 150, height: 120, seats: 4, area: 2},
    {x:  766, y:  567, width: 150, height: 120, seats: 4, area: 2},
    {x: 1012, y:  367, width: 150, height: 120, seats: 4, area: 2},
    {x: 1012, y:  567, width: 150, height: 120, seats: 4, area: 2},
    {x: 1356, y:  367, width: 150, height: 120, seats: 4, area: 2},
    {x: 1356, y:  567, width: 150, height: 120, seats: 4, area: 2},
    {x: 1602, y:  367, width: 150, height: 120, seats: 4, area: 2},
    {x: 1602, y:  567, width: 150, height: 120, seats: 4, area: 2},
    {x:  831, y:  757, width: 120, height:  70, seats: 2, area: 2},
    {x: 1017, y:  757, width: 120, height:  70, seats: 2, area: 2},
    {x: 1381, y:  757, width: 120, height:  70, seats: 2, area: 2},
    {x: 1567, y:  757, width: 120, height:  70, seats: 2, area: 2},
// Bar seats should probably not be reservable?
//    {x: 1022, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1107, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1192, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1277, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1362, y:  178, width:  50, height:  50, seats: 1, area: 2},
//    {x: 1447, y:  178, width:  50, height:  50, seats: 1, area: 2},
];


// Table selection states
var tsOccupiedTableIDs = []; // Which tables are not available
var tsSelectedTableIDs = []; // Which tables were selected
var tsHoveredTableID  = -1; // Which table the mouse is over

var tsCanvas = document.getElementById("table-selection-canvas");
var tsImgObj = new Image();
tsImgObj.onload = function() {
    // Set canvas's size to the size of the now loaded image
    tsCanvas.width  = tsImgObj.width;
    tsCanvas.height = tsImgObj.height;
    // Determine occupied tables
    for(let i = 0; i < restaurant_tables.length; i++) {
        if(Math.random() < 0.5) // 50 % chance per table to be occupied
            tsOccupiedTableIDs.push(i);
    }
    // Draw!
    drawTableSelectionCanvas();
};
tsImgObj.src = "public/images/restaurant.png";

tsCanvas.addEventListener("click", function(e) {
    let clickPos = getCanvasMouseCoords(e.pageX, e.pageY);
    let selectedTableID = getClosestAvailableTableID(clickPos.x, clickPos.y);

    if(selectedTableID != -1) {
        let search_result = tsSelectedTableIDs.indexOf(selectedTableID);
        if(search_result == -1) // If selected table wasn't selected before
            tsSelectedTableIDs.push(selectedTableID);
        else // If selected table was already selected before -> deselect it
            tsSelectedTableIDs.splice(search_result, 1); // Remove table id from list

        // Let the rest of the webpage know which tables were selected
        let seatCount = 0;
        for(let i = 0; i < tsSelectedTableIDs.length; i++)
            seatCount += restaurant_tables[tsSelectedTableIDs[i]].seats;
        selectTables(tsSelectedTableIDs, seatCount);
    }

    drawTableSelectionCanvas();
});
tsCanvas.addEventListener("mousemove", function(e) {
    var movePos = getCanvasMouseCoords(e.pageX, e.pageY);
    tsHoveredTableID = getClosestAvailableTableID(movePos.x, movePos.y);
    drawTableSelectionCanvas();
});
tsCanvas.addEventListener("mouseleave", function() {
    tsHoveredTableID = -1;
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
    for(let i = 0; i < restaurant_tables.length; i++) {
        // Skip table if it's occupied
        if(tsOccupiedTableIDs.indexOf(i) != -1)
            continue;
        
        let table = restaurant_tables[i];

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

function drawTableSelectionCanvas() {
    var ctx = tsCanvas.getContext("2d");
    ctx.drawImage(tsImgObj, 0, 0, tsImgObj.width, tsImgObj.height); // Background image

    // Determine drawing values from the image size
    var tsImgDiagonalLength = Math.sqrt(tsImgObj.width*tsImgObj.width + tsImgObj.height*tsImgObj.height);
    var tableBoxPadding = tsImgDiagonalLength * 0.005;
    ctx.lineWidth = tsImgDiagonalLength * 0.005;
    
    // Table positions refer to a restaurant size that might be different from
    // the displayed restaurant image's size -> Calculate scale factor
    var hori_scale = tsImgObj.width  / restaurant_dimensions.width;
    var vert_scale = tsImgObj.height / restaurant_dimensions.height;

    // Draw occupied tables
    for(let i = 0; i < tsOccupiedTableIDs.length; i++) {
        let occTable = restaurant_tables[tsOccupiedTableIDs[i]];
        let x = (occTable.x - tableBoxPadding) * hori_scale;
        let y = (occTable.y - tableBoxPadding) * vert_scale;
        let w = (occTable.width  + 2 * tableBoxPadding) * hori_scale;
        let h = (occTable.height + 2 * tableBoxPadding) * vert_scale;
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
        var table = restaurant_tables[tsSelectedTableIDs[i]];
        let x = (table.x - tableBoxPadding) * hori_scale;
        let y = (table.y - tableBoxPadding) * vert_scale;
        let w = (table.width  + 2 * tableBoxPadding) * hori_scale;
        let h = (table.height + 2 * tableBoxPadding) * vert_scale;
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
        var table = restaurant_tables[tsHoveredTableID];
        let x = (table.x - tableBoxPadding) * hori_scale;
        let y = (table.y - tableBoxPadding) * vert_scale;
        let w = (table.width  + 2 * tableBoxPadding) * hori_scale;
        let h = (table.height + 2 * tableBoxPadding) * vert_scale;
        // Draw filled transparent rect
        ctx.fillStyle = 'rgba(0, 114, 76, 0.15)';
        ctx.fillRect(x, y, w, h);
        // Draw rectangle border
        ctx.strokeStyle = 'rgba(0, 114, 76, 0.8)';
        ctx.strokeRect(x, y, w, h);
    }
}
