import { useState } from 'react';
import { csv, extent, DSVRowArray } from "d3"
import "./App.css"

function App() {

  type CSVData = DSVRowArray<string> | null
  const [data, setData] = useState<CSVData>(null)

  const chartSize = 500
  const legendPadding = 200

  const _extent = extent(data.caffeine)

  if (!data) {
    csv("caffeine.csv").then(
      (data) => {
        setData(data)
      }
    )
  }

  if (data) {
    const subset = data.filter((row) => {
      if (row) {
        return row.caffeine == "25"
      }
    })
    console.log(subset)
  }

  return (
    <div className="App">
      <h1>Caffeine and Calories in Food</h1>
      <svg
        width={chartSize + legendPadding}
        height={chartSize}
        style={{ border: "1px solid gray" }}
      >

      </svg>
    </div>
  )
}

export default App
