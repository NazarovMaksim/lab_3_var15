let width = 500;
let height = 500;

let svg = d3.select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

function resetCanvas(){
    svg.selectAll("path")
        .remove();
    svg.selectAll("g")
        .remove();
}