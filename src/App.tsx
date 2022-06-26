import React, { useState } from 'react'
import './App.css'
import {SortableAnswer} from "./SortableAnswer";

function App() {
  return (
    <div className="App">
      <SortableAnswer
          question={"Ordena de norte a sur"}
          options={["Paris", "Madrid", "Bogotá"]}
          solution={[]}
      />
    </div>
  )
}

export default App
