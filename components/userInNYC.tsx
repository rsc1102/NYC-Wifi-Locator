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

type datapoint = {
    "key": number,
    "lat": number,
    "lng": number,
    "Type": string,
    "Remarks": string|null,
    "Name": string|null
}

export default function UserInNYC(user_location:location){
    const data = GetData();

    data.map((item:datapoint) => {
        if(distance_in_miles(user_location.lat,user_location.lng,item.lat,item.lng) <= 2){
            return true;
        }
    })
    return false;
}