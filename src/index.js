// Some text
var h1 = document.createElement("h4");
h1.innerHTML = "This is a very simple program that shows you on a chart how much you sleep, exercise and spend time on social media";
document.body.append(h1);


var br = document.createElement("br");

// Label
var lblSleep = document.createElement("label");
lblSleep.innerHTML = "Sleep ";
lblSleep.style.marginLeft = "65px";

// Label
var lblExe = document.createElement("label");
lblExe.innerHTML = "Exercise ";
lblExe.style.marginLeft = "30px";

// Label
var lblMedia = document.createElement("label");
lblMedia.innerHTML = "Social media";
lblMedia.style.marginLeft = "10px";

var div1 = document.createElement("div");

var btnAddDay = document.createElement("button");
btnAddDay.innerHTML = "Add day";
btnAddDay.setAttribute("id", "click");
document.body.appendChild(btnAddDay);

div1.append(lblSleep, lblExe, lblMedia, br);
document.body.appendChild(div1);

var divAllDays = document.createElement("div");
document.body.appendChild(divAllDays);

btnAddDay.onclick = addDay;

var dayCount = 0; 

// This function adds days from a press of a button
function addDay() {
    
    var divDay = document.createElement("div"); //this the row container for the day        

    var dayLabel = document.createElement("label");
    dayLabel.innerHTML = (dayCount+1).toString();
    divDay.appendChild(dayLabel)
        
    for (let i = 0; i < 3; i++) {
        var input = document.createElement("input");
        input.setAttribute("id", "inputColumn_" + i.toString() + dayCount.toString())
        input.value = ""; 
        input.oninput = updateChart;     
        divDay.append(input);
    }
    
    dayCount++;

    divAllDays.appendChild(divDay);
    updateChart();
}


// Create a function that updates data to chart
function updateChart()
{    

    var seriesArray = chart.getSeries(); 
    

    for(let i = 0 ; i<seriesArray.length; i++)
    {
        seriesArray[i].clear(); 

        for(let day =0; day < dayCount; day++)
        {
            var hours = Number(
                document.getElementById("inputColumn_" + i.toString() + day.toString()).value);
            seriesArray[i].add({x: day, y: hours })
        }
        
    }
    chart.getDefaultAxisX().fit();
    chart.getDefaultAxisY().fit();
    
}


// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    Themes,
    SliceLabelFormatters,
    LegendBoxBuilders

} = lcjs


const db = lightningChart().Dashboard({
    numberOfColumns: 6,
    numberOfRows: 2,
    theme: Themes.lightNew
})


// Create a XY Chart.
const chart = db.createChartXY({
    columnIndex: 1,
    rowIndex: 0,
    columnSpan: 4,
    rowSpan: 0 
})
    .setTitle('')

// Create a point line series for sleep
const seriesSleep = chart.addPointLineSeries({ pointShape: lcjs.PointShape.Circle})

seriesSleep.setName('Sleep')
seriesSleep.setCursorResultTableFormatter((tableBuilder, series, x, y, dataPoint) => {
    return tableBuilder
        .addRow(series.getName())
        .addRow(`Day:`, '', dataPoint.x.toFixed(1))
        .addRow(`Hours:`, '', dataPoint.y.toFixed(1))
})

// Create a point line series for exercise
const seriesExe = chart.addPointLineSeries({ pointShape: lcjs.PointShape.Circle})

seriesExe.setName('Exercise')
seriesExe.setCursorResultTableFormatter((tableBuilder, series, x, y, dataPoint) => {
    return tableBuilder
        .addRow(series.getName())
        .addRow(`Day:`, '', dataPoint.x.toFixed(1))
        .addRow(`Hours:`, '', dataPoint.y.toFixed(1))
})

// Create a point line series for social media
const seriesMedia = chart.addPointLineSeries({ pointShape: lcjs.PointShape.Circle})

seriesMedia.setName('Social Media')
seriesMedia.setCursorResultTableFormatter((tableBuilder, series, x, y, dataPoint) => {
    return tableBuilder
        .addRow(series.getName())
        .addRow(`Day:`, '', dataPoint.x.toFixed(1))
        .addRow(`Hours:`, '', dataPoint.y.toFixed(1))
})

// Add legend box
const legend = chart.addLegendBox().add(chart)

// Add CSS.
function addStyle(styleString) {
    const style = document.createElement("style");
    style.textContent = styleString;
    document.body.append(style);
  }

addStyle(`
button {
    border-radius: 10px;
    border-color: limegreen;
    cursor: pointer;
    font-size: 21px;
}
body {
    font-family: Arial;
    font-size: 23px;
}
input {
    border-radius: 7px;
    border-color: slateblue;
    width: 100px;
    margin-left: 10px;
    margin right: 10px;
    font-size: 20px;
}
div {
    text-align: center;
}
h4 {
    text-align: center;
}
`)