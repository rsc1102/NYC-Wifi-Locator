"use client"

import MapWindow from "./map"
import { useState } from 'react';


function App() {
    const [loadMap,setLoadMap] = useState(false);
    const [wifiTypeSelected,setWifiTypeSelected] = useState('Any');
    const [searchRangeSelected,setSearchRangeSelected] = useState(1);

    const handleWifiTypeChange = () => {
      const val = (document.getElementById("wifiTypeDropdown") as HTMLInputElement|null)?.value;
      setWifiTypeSelected(val!);
    }
    
    const handleSearchRangeValue = () =>{
      const searchRange = (document.getElementById("searchRange") as HTMLInputElement|null)?.value;
      const val = parseFloat(searchRange!)/100;
      document.getElementById("searchRangeValue")!.innerText = val.toFixed(2);
      setSearchRangeSelected(val);
    }

    const handleSearchButtonClick = () => {
      document.getElementById("heading")?.classList.add("hide");
      document.getElementById("headingWrapper")?.classList.add("hide");
      document.getElementById("mapWrapper")?.classList.add("tall");
      setLoadMap(true);
    }
    
    return (
        <main className="main">
            <div className="headingWrapper" id="headingWrapper">
              <h1 id="heading">NYC Wifi Locator</h1>
            </div>
            <div className="filters">
              <div className="filterChild">
                <label className="label">Wifi Type :</label>
                <select name="wifiType" id="wifiTypeDropdown" onChange={handleWifiTypeChange}>
                <option value="Any">Any</option>
                  <option value="Free">Free</option>
                  <option value="Limited Free">Limited Free</option>
                </select>
              </div>
              <div className="filterChild">
                <label className="label">Search Range :</label>
                <input name="searchRange" id="searchRange" type="range" min="0" max="200" onChange={handleSearchRangeValue}/>
                <span id="searchRangeValue">1.00</span><span>Miles</span>
              </div>
            </div>
            <div className="mapWrapper" id="mapWrapper">
              <div className="mapWindow">
                {loadMap ? <MapWindow range={searchRangeSelected} wifiType={wifiTypeSelected}/>: 
                <button className="SearchButton" id="SearchButton" onClick={handleSearchButtonClick}>Search</button>}
              </div>
            </div>
            
        </main>
    )
}
export default App;