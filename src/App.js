import React from 'react';

import Info from './components/info/info';
import Form from './components/form/form';
import Weather from './components/weather/weather';

const API_KEY = "fbe9de5be07655937391c8c3d3e33dda";
const API_URL = "http://api.openweathermap.org/data/2.5/weather";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: undefined
    };

    gettingWeather = async (e) => {
        e.preventDefault();
        var city = e.target.elements.city.value;

        if (city) {
            const url = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await url.json();

            this.setState({
                temp: data.main.temp,
                pressure: data.main.pressure,
                city: data.name,
                country: data.sys.country,
                sunrise: this.extractedDate(data, data.sys.sunrise),
                sunset: this.extractedDate(data, data.sys.sunset),
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                pressure: undefined,
                error: "Введите название города!"
            });
        }
    };

    extractedDate(data, val) {
        var date = new Date();
        date.setTime(val);
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    pressure={this.state.pressure}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
