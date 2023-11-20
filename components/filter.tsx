import GetData from "./data";

function distance_in_miles(lat1 :number,lon1:number,lat2:number,lon2:number) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula 
    let dlon = lon2 - lon1; 
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in miles
    let r = 3956;

    // calculate the result
    return (c * r);
}

type location = {
    lat : number,
    lng : number
};

export default function Filter(user_location:location,range:number,wifiType:string){
    const data = GetData();
    let valid_data = [];
    for (var key in data) {
        
        if(distance_in_miles(user_location.lat,user_location.lng,data[key].lat,data[key].lng) < range && 
        (wifiType === "Any" || wifiType === data[key].Type)){
            valid_data.push(data[key]);
        }
    }
    return valid_data;
}