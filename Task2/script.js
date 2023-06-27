const marginX = 50;
const marginY = 40;
const n = 100;

f = (x) => (x - 3)/(x**2 - 25);

let drawButton = document.getElementById('drawButton');
drawButton.onclick = function (){
    if (isNaN(parseFloat(document.getElementById('valueA').value)) || !isFinite(document.getElementById('valueA').value) ||
        isNaN(parseFloat(document.getElementById('valueB').value)) || !isFinite(document.getElementById('valueB').value) ||
        +document.getElementById('valueA').value >= +document.getElementById('valueB').value)
        alert('Некорректные значения');
    else{
        resetCanvas();
        let a = +document.getElementById('valueA').value;
        let b = +document.getElementById('valueB').value;
        let h = (b - a) /(n - 1);

        let arrBreakPoints = [-5, 5];
        if (!arrBreakPoints.includes(b))
            arrBreakPoints.push(b);

        let graphs = [];
        let breakPointNum = 0;
        for (let i = 0; i < n; i++) {
            let x = a + i * h;
            if (!(x < arrBreakPoints[breakPointNum] ||
                (x <= arrBreakPoints[breakPointNum] && isFinite(f(x))))){
                breakPointNum++;
            }
            if (Math.abs(f(x)) < 50){
                if (graphs[breakPointNum] === undefined){
                    graphs[breakPointNum] = [];
                }
                graphs[breakPointNum].push({'x': x, 'f': f(x)});
            }
        }
        graphs = graphs.filter(Boolean);

        let min = Infinity
        let max = -Infinity;
        for (let i = 0; i < graphs.length; i++){
            let minMaxF = d3.extent(graphs[i].map(d => d.f));
            min = (minMaxF[0] < min) ? minMaxF[0] : min;
            max = (minMaxF[1] > max) ? minMaxF[1] : max;
        }

        let scaleX = d3.scaleLinear()
            .domain([a, b])
            .range([0, width - 2 * marginX]);
        let scaleY = d3.scaleLinear()
            .domain([min, max])
            .range([height - 2 * marginY, 0]);

        let axisX = d3.axisBottom(scaleX);
        let axisY = d3.axisLeft(scaleY);

        svg.append("g")
            .attr("transform", `translate(${marginX}, ${scaleY(0) + marginY})`)
            .call(axisX);
        svg.append("g")
            .attr("transform", `translate(${marginX + scaleX(0)}, ${marginY})`)
            .call(axisY);

        let lineF = d3.line()
            .x(function(d) {
                return scaleX(d.x);
            })
            .y(function(d) {
                return scaleY(d.f);
            })

        graphs.forEach(function (data){
            svg.append("path")
                .datum(data)
                .attr("d",lineF)
                .attr("transform", `translate(${marginX}, ${marginY})`)
                .style("stroke-width", "2")
                .style("stroke", "red")
        });
    }
};