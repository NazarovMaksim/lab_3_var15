const phi = Math.PI/2;
const A = 150;
const B = 150;

getX = (i, h) => A * Math.sin(i * h + phi);
getY = (i, h) => B * Math.sin(2 * i * h);

let drawButton = document.getElementById("drawButton");
drawButton.onclick = function (){
    let n = document.getElementById('valueN').value;
    if (n < 8 || n > 1000) alert("Некорректные данные");
    else {
        resetCanvas();
        drawCurve(n);
    }
}

function drawCurve(n) {
    let h = 2 * Math.PI / n;

    let pointsArr = [];
    for (let i = 0; i < n; i++) {
        pointsArr.push({'x': getX(i, h), 'y': getY(i, h)});
    }

    svg.selectAll("circle")
        .data(pointsArr)
        .join("circle")
        .attr('cx', function (d) { return (width / 2) + d.x})
        .attr('cy', function (d) { return (height / 2) - d.y})
        .attr('r', 5)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2');
}

function resetCanvas(){
    svg.selectAll("circle")
        .remove();
}