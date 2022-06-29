const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require('https');
const e = require("express");
// var cityname ='London';

const app = express();
const apikey = '76d229e80b442fd50bbc6973018e3e04';

const now = new Date();
const current = now.getHours() + ':' + now.getMinutes();
const withPmAm = now.toLocaleTimeString('en-US', {
    // en-US can be set to 'default' to use user's browser settings
    hour: '2-digit',
    minute: '2-digit',
  });
  


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post('/',function(req,res){
    var cityname = req.body.place;

    const link ='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid='+apikey+'&units=metric';
    console.log(cityname);
    https.get(link,function(response){
        console.log(response.statusCode);
        if(response.statusCode==200){

        response.on('data', (d) => {
            var weatherdata= JSON.parse(d);
            var Temp = weatherdata.main.temp;
            const cty = weatherdata.name;
            const humid = weatherdata.main.humidity;
            const weatherDetail = weatherdata.weather[0].main;
            const desc = weatherdata.weather[0].main;
            const ltemp = weatherdata.main.temp_min;
            const htemp = weatherdata.main.temp_max;
            const sunset = weatherdata.sys.sunset;
            const sunrise = weatherdata.sys.sunrise;
            
            const windspeed = weatherdata.wind.speed;
            const pressure = weatherdata.main.pressure;
            console.log(Temp);
            console.log(windspeed);
            console.log(pressure);
            console.log(withPmAm);
            res.render('index.ejs',{
                Temprature:Math.round(Temp),
                City:cty,
                Moisture:humid,
                Windspeed:windspeed ,
                Description:desc,
                Sunrise : mytime(sunrise),
                Sunset :mytime(sunset),
                Lowtemp:ltemp,
                Hightemp:htemp,
                Time:withPmAm
                

            });

          });
        }else{
            res.render('404.ejs')
        }

    });
    

});


app.get("/",function(req,res){
    res.render('index.ejs',{
        Temprature:'28',
        City :'London',
        Moisture:'28',
        Windspeed:'Cloudy',
        Sunrise : '6:03',
        Sunset :'17:20',
        Lowtemp:'15',
        Hightemp:'23',
        Description:'Clouds',
        Time:withPmAm
        

    });
})

app.get('/Citynotfound',function(req,res){
    res.render('404.ejs');
})

app.post('/home',function(req,res){
    res.redirect('/');
})



app.listen(process.env.PORT || 3000,function(err){
    console.log('Succesfully server started');

});

function mytime(x){
    const unixTimestamp = x;

const date = new Date(unixTimestamp * 1000);

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// 👇️ Format as hh:mm:ss
const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;

return time; // 👉️ 09:25:32

}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  