function hello(){
  if("geolocation" in navigator){
  console.log("connected")
  navigator.geolocation.getCurrentPosition(async position=>{
const lat=position.coords.latitude;
const latitude=lat
const lon=position.coords.longitude;
const longitude=lon
document.getElementById("latitude").innerText=position.coords.latitude;
document.getElementById("longitude").innerText=position.coords.longitude;
const text=document.getElementById('textbox').value
console.log(text)

const nine=[{
name:'a',
area:'tourist_attraction'
},
{
name:'b',
area:'restaurant'
},{
name:'c',
area:'stadium'
},{
name:'d',
area:'ngos and non profit organizations'
},
{
name:'e',
area:'hospital'
}]
nine.forEach(element=>{
if(element.name==text){
var target=element.area;
window.target1=target
}
})
console.log(target1)
  const resi=await fetch(`/weather/${lat},${lon}/${target1}`)
  const json=await resi.json();
  console.log(json)

const temp=document.createElement('div')
temp.textContent=`Temperature:${json.weather.currently.temperature}`

const pressure=document.createElement('div')
pressure.textContent=`Pressure:${json.weather.currently.pressure}`

const air=document.createElement('div')
air.textContent=`Air Value:${json.air.results}`

const mood=document.createElement('div')
mood.textContent=`Summary of tday:${json.weather.hourly.summary}`

const place=json.places.results
const arr=[]
place.forEach(element => {
  arr.push({geo:element.geometry.location,
  name:element.name,
placeid:element.place_id})
});
console.log(arr)
window.arr2=arr;

document.body.append(pressure,temp,air,mood)



var options={
   zoom:10,
   center:{
     lat:latitude,
   lng:longitude
   }
}
var map=new google.maps.Map(document.getElementById('map'),options)
var marker=new google.maps.Marker({
   position:{
    lat:latitude,
   lng:longitude
   },
   map:map
})

arr.forEach(el=>{

var marker=new google.maps.Marker({
   position:{
    lat:el.geo.lat,
   lng:el.geo.lng
   },
   map:map,
   icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
})
var infoWindow=new google.maps.InfoWindow({
 content:`<h1>${el.name}</h1>`
});
marker.addListener('click',function(){
 infoWindow.open(map,marker)

})

const hospital=document.createElement('div')
hospital.textContent=`${el.name}`;
document.body.append(hospital);

})




}

)
}
else{
  console.log("not connected")
}
}

const hi=async()=>{
data=arr2;
const option={
   method:"POST",
   headers:{
       'Content-Type':'application/json'
   },
   body:JSON.stringify(data)
};
const res=await fetch('/api',option);
const data1=await res.json();
console.log(data1);
const data2=data1.data;


data2.forEach(element=>{
const hospital=document.createElement('div')
hospital.textContent=`${element.name}`;
const contact=document.createElement('div')
hospital.textContent=`${element.formatted_phone_number}`;
document.body.append(hospital,contact);
})
}
