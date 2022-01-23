import { line, scaleLinear, max } from "d3"
import { AxisLeft, AxisBottom } from "@visx/axis"
import "./App.css"
import data from "./caffeine_data"

function App() {

  const chartWidth = 800
  const chartHeight = 800
  const marginX = 150
  const marginY = 50
  const extentPaddingX = 50
  const extentPaddingY = 20

  const caffeine = data.map((row) => row.caffeine)
  const calories = data.map((row) => row.calories)


  const _extentX = [0, max(caffeine) + extentPaddingX]
  const _scaleX = scaleLinear()
    .domain([0, _extentX[1]])
    .range([marginX, chartWidth - marginX])


  const _extentY = [0, max(calories) + extentPaddingY]
  const _scaleY = scaleLinear()
    .domain([0, _extentY[1]])
    .range([chartHeight - marginY, marginY])

  const _scaleColor = scaleLinear().domain([0, 200, 300, 700]).range(["green", "yellow", "orange", "red"])
  console.log(_scaleColor(100))

  const _lineMaker = line()
    .x((d) => {
      return _scaleX(d[0])
    })
    .y((d) => {
      return _scaleY(d[1])
    })

  return (
    <>
      <div className="App">
        <h1>Caffeine and Calories in Beverages</h1>
        <svg
          width={chartWidth}
          height={chartHeight}
        >
          <AxisLeft
            left={marginX}
            scale={_scaleY}
            label="Calories"
          />
          <AxisBottom
            top={chartHeight - marginY}
            scale={_scaleX}
            label="Caffeine (mg)"
          />
          <path
            stroke="lightgray"
            strokeWidth={1}
            stroke-dasharray="5,5"
            fill="none"
            d={_lineMaker([[_extentX[0], 200],[_extentX[1], 200]])}
          />
          <text
            y={_scaleY(200)}
            fontSize=".75em"
            textAnchor="start"
            fill="green"
          >
            <tspan x={_scaleX(_extentX[1])}>Recommended calories</tspan>
            <tspan x={_scaleX(_extentX[1])} dy="1em">from daily beverages</tspan>
            <tspan x={_scaleX(_extentX[1])} dy="1em">(for 2,000 calorie diet)</tspan>
          </text>
          <path
            stroke="lightgray"
            strokeWidth={1}
            stroke-dasharray="5,5"
            fill="none"
            d={_lineMaker([[100, _extentY[0]],[100, _extentY[1]]])}
          />
          <text
            y={_scaleY(_extentY[1])}
            fontSize=".75em"
            textAnchor="middle"
            fill="green"
          >
            <tspan x={_scaleX(100)} dy="-1em">Recommended daily caffeine</tspan>
            <tspan x={_scaleX(100)} dy="1em">limit for adolescents 12yr+</tspan>
          </text>
          <path
            stroke="lightgray"
            strokeWidth={1}
            stroke-dasharray="5,5"
            fill="none"
            d={_lineMaker([[200, _extentY[0]],[200, _extentY[1]]])}
          />
          <text
            y={_scaleY(_extentY[1])}
            fontSize=".75em"
            textAnchor="middle"
            fill="green"
          >
            <tspan x={_scaleX(200)} dy="-1em">Recommended daily caffeine</tspan>
            <tspan x={_scaleX(200)} dy="1em">limit for pregnant women</tspan>
          </text>
          {data.map((row) => {
            return (
              <circle
                key={row.key}
                cx={_scaleX(row.caffeine)}
                cy={_scaleY(row.calories)}
                r={3}
                fill={_scaleColor(row.caffeine + 1.5*row.calories)}
              />
            )
          })}
          {data.map((row) => {
            return (
              <text
                key={row.key}
                x={_scaleX(row.caffeine)}
                dx={5}
                dy={-5}
                y={_scaleY(row.calories)}
                fontSize=".75em"
                textAnchor="start"
              >
                {/*`(${row.caffeine}, ${row.calories})`*/}
                {row.coffee}
              </text>
            )
          })}
        </svg>
      </div>
      <div style={{width: chartWidth, marginLeft: marginX}} >
        <p>
          Adults in the US consume an average of 135 mg of caffeine daily according <a href="https://www.hsph.harvard.edu/nutritionsource/caffeine/" target="_blank">
          to a study by Harvard</a>. Additionally, another study from Harvard suggests that getting less than 10 percent of calories
          (based on a 2,000 calorie diet) from beverages, which equals roughly 200 calories is OK. Consumers need a better understanding of the caffeine and calorie content of beverages they drink on a daily basis
          in order to make healthy decisions that follow recommendations. By looking at this visualization, consumers can answer these questions...
          How much caffeine and calories are in my favorite beverages? Which beverages should I choose to be healthier? Which beverage(s) will get me over my recommended allotment of caffeine/calories?
          </p>
          <p>
          <a href="http://bit.ly/IIB_BuzzVsBulge" target="_blank">This dataset</a> I used represents common beverages consumed by the average American. To represent it visually, I created a scatterplot for positional encoding of the data.
          For the scatterplot vizualization I created circles to represent each beverage and their caffeine and calorie content.
          The name of each beverage is included as a text label to be easily identifiable by the user. The X-Axis represents the caffeine content measured in milligrams and the Y-Axis represents the calorie content such that beverages in the upper right region have both high caffeine and calorie content.
          If you notice the grey dashed lines on the x and y-axis they mark the recommended limits (in green). This is so that users can look for beverages
          within the recommended limits using the marked lines as a visual reference. I also included a color scale for the different
          beverages ranging from shades of green for safe levels of consumption, to yellow for exercising caution, and orange to red to indicate high levels for both
          caffeine as well as calories, since these colors are commonly associated with safety/danger levels.
        </p>
        <p><a href="https://github.com/wills0ng/info474-a1" target="_blank">GitHub repo link</a></p>
      </div>
    </>
  )
}

export default App
