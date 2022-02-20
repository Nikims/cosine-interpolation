points = [];
isMousePressed = false;
for (i = 0; i < 5; i++) {
  points.push({ x: (i * 600) / 5, y: Math.random() * 200 + 300 });
}

cosinePoints = [];
function updatePoints() {
  for (i = 0; i < points.length; i++) {
    if (
      areColliding(points[i].x, points[i].y, 40, 40, mouseX, mouseY, 50, 50) &&
      isMousePressed
    ) {
      points[i].x = mouseX;
      points[i].y = mouseY;
    }
  }
}

function draw() {
  cosinePoints = [];
  for (j = 0; j < points.length - 1; j++) {
    for (
      i = points[j].x < points[j + 1].x ? points[j].x : points[j + 1].x;
      i <
      Math.abs(points[j + 1].x - points[j].x) +
        (points[j].x < points[j + 1].x ? points[j].x : points[j + 1].x);
      i += 3
    ) {
      cosinePoints.push({
        x: i,
        y:
          (Math.cos(
            ((i - points[j].x) / (points[j + 1].x - points[j].x)) * Math.PI
          ) -
            1) *
            0.5 *
            (points[j].y - points[j + 1].y) +
          points[j].y,
      });
    }
    for (i = 1; i < cosinePoints.length - 1; i++) {
      drawLine(
        cosinePoints[i - 1].x,
        cosinePoints[i - 1].y,
        cosinePoints[i].x,
        cosinePoints[i].y
      );
    }
    for (let i in points) {
      context.fillRect(points[i].x, points[i].y, 5, 5);
    }
  }
}
function update() {
  updatePoints();
}
function mouseup() {
  isMousePressed = false;
}
function mousedown() {
  isMousePressed = true;
}
