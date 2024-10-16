/*
getCurrentLocation :get location ở vị trí hiện tại
fetchWeatherByCoordinates :get dữ liệu từ API
citySearch: Tìm kiếm thành phố  
toLowerCaseNonAccentVietnamese : hàm chuyển đổ từ ko dấu sang có dấu
convertCelsiusToFahrenheit: hàm chuyển từ độ C => F
convertCelsiusToKelvin : hàm chuyển từ độ C => K
convertAndDisplayTemperature : kiểm tra các sự kiệu click
*/
var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".value");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var time = document.querySelector(".time");
var content = document.querySelector(".content");
var body = document.querySelector("body");
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                await fetchWeatherByCoordinates(latitude, longitude);
            },
            function (error) {
                console.error("Lỗi khi lấy vị trí hiện tại:", error);
            }
        );
    } else {
        console.error("Trình duyệt không hỗ trợ lấy vị trí hiện tại.");
    }
}

async function fetchWeatherByCoordinates(latitude, longitude) {
    let mykeyapi = "45ad36d5fe924e89a4662631242204";
    let apiURL = `http://api.weatherapi.com/v1/current.json?key=${mykeyapi}&q=${latitude},${longitude}&aqi=no`;
    try {
        let response = await fetch(apiURL);
        let data = await response.json();

        if (response.ok) {
            city.innerText = data.location.name;
            content.classList.remove("hide");
            country.innerText = data.location.country;
            wind.innerText = data.current.wind_mph + "m/s";
            sun.innerText = data.current.humidity + "%";
            value.innerText = data.current.temp_c + "°C";
            document
                .getElementById("toCelsius")
                .addEventListener("click", function () {
                    value.innerText = data.current.temp_c + "°C";
                });
            shortDesc.innerText = data.current.condition.text || "";
            time.innerText = new Date().toLocaleString("vi");
            visibility.innerText = data.current.text || "";
            body.setAttribute("class", "hot");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
}
async function citySearch() {
    let captionSearch = search.value.trim();

    let citySearch = toLowerCaseNonAccentVietnamese(captionSearch);
    let mykeyapi = "45ad36d5fe924e89a4662631242204";
    let apiURL = `http://api.weatherapi.com/v1/current.json?key=${mykeyapi}&q=${citySearch}&aqi=no`;
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        if (response.ok) {
            city.innerText = data.location.name;
            content.classList.remove("hide");

            country.innerText = data.location.country;
            wind.innerText = data.current.wind_mph + "m/s";
            sun.innerText = data.current.humidity + "%";
            value.innerText = data.current.temp_c + "°C";
            document
                .getElementById("toCelsius")
                .addEventListener("click", function () {
                    value.innerText = data.current.temp_c + "°C";
                });
            shortDesc.innerText = data.current.condition.text || "";
            time.innerText = new Date().toLocaleString("vi");
            body.setAttribute("class", "hot");
            console.log("hello");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
}

search.addEventListener("input", function () {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(citySearch, 2000);
});

getCurrentLocation();

function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
function convertCelsiusToKelvin(celsius) {
    return celsius + 273.15;
}
function convertFahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}
function convertFahrenheitToKelvin(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9 + 273.15;
}
function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
function convertKelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9) / 5 + 32;
}

document.getElementById("toFahrenheit").addEventListener("click", function () {
    convertAndDisplayTemperature("F");
});

document.getElementById("toKelvin").addEventListener("click", function () {
    convertAndDisplayTemperature("K");
});
function convertAndDisplayTemperature(unit) {
    let temperature = parseFloat(value.innerText);

    if (unit === "C") {
        // value.innerText = data.current.temp_c + "°C";
    } else if (unit === "F") {
        temperature = convertCelsiusToFahrenheit(temperature);
        value.innerText = temperature.toFixed(2) + "°F";
    } else if (unit === "K") {
        temperature = convertCelsiusToKelvin(temperature);
        value.innerText = temperature.toFixed(2) + "K";
    }
}

// module.exports = {
//   getCurrentLocation,
//   fetchWeatherByCoordinates,
//   citySearch,
//   toLowerCaseNonAccentVietnamese,
//   convertCelsiusToFahrenheit,
//   convertCelsiusToKelvin,
//   convertAndDisplayTemperature,
// };
