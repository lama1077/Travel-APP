// global variables
let input_date = document.querySelector(".input_date");
let count = document.querySelector(".countDown");

// keys
const GEONAMES_IDNAME = "lama1077";
const PIXABAY_KEY = "20259424-383de431d8010175e73137d22";
const WEATHERBIT_KEY = "976a0911f3c543a199aa7709bf4b72ac";

// submit function
async function formHndler() {
    let input_city = document.querySelector(".input_text").value;
    CountDownDatefuction();

    //fetch from geonames api to get longitude and latitude
    fetch("http://api.geonames.org/searchJSON?q=" + input_city + "&maxRows=10&username=" + GEONAMES_IDNAME)
        .then((response) => response.json())
        .then((data) => {
            let city = data["geonames"][0]["name"];
            let country = data["geonames"][0]["countryName"];
            let lat = data["geonames"][0]["lat"];
            let lng = data["geonames"][0]["lng"];

            //fetch from pixabay api to get image for city to get temperature
            fetch("https://pixabay.com/api/?key=" + PIXABAY_KEY + "&q=" + input_city)
                .then((response) => response.json())
                .then((data) => {
                    let Image = data["hits"][0]["webformatURL"];

                    //fetch from weatherbit api
                    fetch("https://api.weatherbit.io/v2.0/current?lat=" + lat + "&lon=" + lng + "&key=" + WEATHERBIT_KEY)
                        .then((response) => response.json())
                        .then((data) => {
                            let temp = data["data"][0]["temp"];

                            //fetch from restcountries api to get more details for city
                            fetch("https://restcountries.eu/rest/v2/name/" + country)
                                .then((response) => response.json())
                                .then((data) => {
                                    let flag = data[0]["flag"];
                                    let language = data[0]["languages"][0]["name"];
                                    let curr = data[0]["currencies"][0]["name"];
                                    let symbol = data[0]["currencies"][0]["symbol"];
                                    const info = {
                                        city: city,
                                        country: country,
                                        temp: temp,
                                        flag: flag,
                                        curr: curr,
                                        language: language,
                                        Image: Image,
                                        symbol: symbol,
                                    };
                                    postData("/add", info);
                                    updateUI();
                                });
                        });
                });
        });
};

// function to get the remaining date for the trip
//https://stackoverflow.com/questions/51078140/calculation-of-countdown-timer
function CountDownDatefuction() {
    let countDownDate = Date.parse(input_date.value);
    let now = new Date();
    let distance = countDownDate - now;
    let day = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (distance < 0) {
        count.innerHTML = "EXPIRED";
    } else count.innerHTML = day + " days from today";
}

// Update user interface
const updateUI = async () => {
    const req = await fetch("/all");
    console.log(req);
    try {
        let allData = await req.json();
        console.log(allData);
        document.querySelector(".name").innerHTML = "You are going to " + allData.city + ", " + allData.country;
        document.getElementById("cityimg").innerHTML = `<img style='height: 200px; width: 400px;' src=${allData.Image}>`;
        document.querySelector(".weather").innerHTML = "Currently weather " + allData.temp + " C°";
        document.getElementById("flag").innerHTML = `<img  style='height: 50px; width: 100px;' src=${allData.flag}>`;
        document.querySelector(".language").innerHTML = "Language: " + allData.language;
        document.querySelector(".Currency").innerHTML = "Currency: " + allData.curr + " " + allData.symbol;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to POST data
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

export { formHndler };
