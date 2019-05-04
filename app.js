window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/acab472bed1b6ede906f4671e12ac7d4/${lat},${long}`
        
        
            fetch(api)
            .then(Response =>{
            return Response.json();
            })
            .then(data =>{
                const { temperature, summary, icon} = data.currently;
                //Set DOM Element From The Api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //formula for celcius
                let celcius = (temperature - 32) * (5 / 9);



                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //change temperature to celsius/farenheit

                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celcius;
                        }else{
                            temperatureSpan.textContent = "F";
                        }
                    });
            });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});




























