"use client"

import { useEffect, useState , useMemo} from 'react';
import { GoogleMap, useLoadScript, MarkerF ,InfoWindowF} from "@react-google-maps/api";
import Filter from "components/filter";

export default function MapWindow({range,wifiType}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [userLocation,setUserLocation] = useState({});

  useEffect(() => {
    getUserLocation();
  },[]);
  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      });
    })
  }


  if (!isLoaded || Object.keys(userLocation).length === 0){
    return (
    <div className='flex flex-col items-center '>
      <button className="SearchButton loading-cursor wide" disabled>Searching...</button>
      <span className='permissionInfo'>(Turn on Location Permission if not enabled)</span>
    </div>);
  }

  return (
      <Map userLocation={userLocation} range={range} wifiType={wifiType}/>
  );
}

function Map({userLocation,range,wifiType}) {

  const center = useMemo(() => (userLocation),[]);
  const data = Filter(center,range,wifiType);

  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState(null);

  const handleOnLoad = (map) => {
    setMap(map);
    const bounds = new google.maps.LatLngBounds();
    data.every(( item ) => bounds.extend({lat:item.lat, lng:item.lng}))
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    // const bounds = new google.maps.LatLngBounds();
    // bounds.extend(center)
    // data.every(( item ) => {
    //   if(item.key === marker){
    //     bounds.extend({lat:item.lat, lng:item.lng});
    //     return false;
    //   }
    //   return true;
    // });
    // map.fitBounds(bounds);
  };

  const blueDot = {
    fillColor: '#4285F4',
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
  };


  return (
    <GoogleMap 
      onClick={() => setActiveMarker(null)}
      zoom={15} 
      onLoad={handleOnLoad}
      center={center} 
      mapContainerClassName="map-container">

        <MarkerF position={center}
        icon={blueDot}
        title='You are here!'/>

      {data.map((item) => (

        <MarkerF key = {item.key}
        onClick={() => handleActiveMarker(item.key)}
        position={{ lat:item.lat, lng:item.lng}} >
            {activeMarker === item.key ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)} >
                <div><p><span className='font-bold '>Name: {item.Name}</span>
                <br></br><span className='font-bold '>Type:</span> {item.Type === "Free" ? <span className='font-green'>{item.Type}</span> : <span className='font-red'>{item.Type}</span>}
                <br></br>{item.Remarks}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`} target="_blank" rel="noopener noreferrer"><span className='url'>View on Google Maps</span></a>
                </div>

              </InfoWindowF>
            ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}