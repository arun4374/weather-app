const Curdate = new Date();

const date = Curdate.getDate();
const month = Curdate.getMonth();
const year = Curdate.getFullYear();
const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
const datestr = `${date} ${months[month]} ${year}`;
document.querySelector('.date').textContent=datestr;

var content_pg=document.querySelector('.content');
var not_found=document.querySelector('.notfound');
var page_content=document.querySelector('.pageContent');

// weather info API
const apiKey = "8dd971721fdb38e047cc78589a2ccf90";

async function fetchingWeatherData(city,info){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/${info}?q=${city}&units=metric&appid=${apiKey}`)

   
    if(res.status!=200){
          showDisplay(not_found);
    }
    else{
          showDisplay(content_pg);
    }
   
    return res.json();

}

function showDisplay(page){
    content_pg.style.display='none';
    not_found.style.display='none';
    page_content.style.display='none';
   
    page.style.display='flex';
   
}

async function weatherInfo(city ){
    // all about weatherData
    const weatherData = await fetchingWeatherData(city,'weather');
     const weatherforecast = await fetchingWeatherData(city,'forecast');

     console.log(weatherforecast);
    const loc_txt=document.querySelector('.location-name');
    const temp_txt=document.querySelector('.temp-txt');
    const con_txt=document.querySelector('.condition-txt');
    const weather_icon=document.querySelector('.weather-img');
    const forecastdata=document.querySelector('.forecastdata');

    loc_txt.textContent =weatherData.name;
     temp_txt.textContent = Math.round(weatherData.main.temp)+' ℃';
   con_txt.textContent = weatherData.weather[0].main;
 const weatherCode = weatherData.weather[0].id;
     weather_icon.src =`Assets/${weatherIcon(weatherCode)}`;   



    //  all about weatherforecasting data
    const format_time='06:00:00';
    let current_date=new Date().toISOString().split("T");
   // const today_date=''
   var index=0;
    weatherforecast.list.forEach(element => {
        
        if(element.dt_txt.includes(format_time) &&!element.dt_txt.includes(current_date) && index<3){
           
            const nowDate = new Date(element.dt_txt);
                let otherdays = nowDate.toLocaleDateString('en-US',{
                    month: 'short',
                    day: '2-digit'
                    });
                
            
                let forecastInfo = `
                    <div class="forecast-item">
                        <h3>${otherdays}</h3>
                        <img src="Assets/${weatherIcon(element.weather[0].id)}">
                        <h4>${Math.round(element.main.temp)} ℃</h4>
                    </div>
                `;

                index++;

                forecastdata.insertAdjacentHTML("beforeend",forecastInfo);
            
        }
       
        
    });




   
    
}
function weatherIcon(code){
    if(200<=code&&code<=232){
        return 'thunder.png';
    }
    else if(300<=code&&code<=321){
        return 'drizzle.png';
    }
      else if(500<=code&&code<=531){
        return 'rain.png';
    }
      else if(600<=code&&code<=622){
        return 'snow.png';
    }
      else if(701<=code&&code<=781){
        return 'atmosphere.png';
    }
      else if(code==800){
        return 'clear.png';
    }
      else if(801<=code&&code<=804){
        return 'cloud.png';
    }
    else{
        return 'invalid.png';
    }
}

 
// search bar control
const searchBar=document.querySelector('.input');

document.querySelector('.search').addEventListener('click',()=>{
    var dupSearchBar=searchBar.value;
    if( isLetterOnly(dupSearchBar) ){

        weatherInfo(dupSearchBar);
        searchBar.value = '';
    }
    else{
        alert('Invalid');
        
    }
    
})

searchBar.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter' && isLetterOnly(searchBar.value)){
        weatherInfo(searchBar.value);
        searchBar.value = '';
    }
    
})


function isLetterOnly(dup){
    return  /^[a-zA-Z\s]+$/.test(dup);

}



