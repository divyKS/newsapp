import React, { Component } from 'react'
import Loading from '../Loading/Loading';
import "../Weather/Weather.css"

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        // this.state = {


        this.state = {
            hour: new Date().getHours(),
            error: null,
            isLoaded: false,
            result: [],
            updating: false
        }

        this.apiKey = '179e362faa3b494a87b54911222004';
        this.url = 'https://api.weatherapi.com/v1/forecast.json?key=' + this.apiKey + '&q=Lucknow&hour=' + this.state.hour;
    }

    componentDidMount() {
        this.setState({
            updating: false,
            hour: new Date().getHours()
        })

        fetch(this.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        result: result
                    })
                },
                (error) => {
                    this.setState({
                        error: error,
                        isLoaded: true
                    })
                })
    }

    setNewState = () => {
        let btn = document.getElementsByClassName('updateWeather');
        
        Array.from(btn).forEach((elem)=>{
            elem.style.transform = 'rotate(360px)';
        })

        this.setState({
            updating: true
        });
        this.componentDidMount();
    }

    render() {
        const error = this.state.error;
        const isLoaded = this.state.isLoaded;
        if (error) {
            return (
                <>
                    <br />
                    <center>
                        <div className="weather">
                            <h1>Weather</h1>

                            <span className='currentTemperature'>Unable to load weather</span>
                        </div>
                    </center>
                </>
            )
        }
        else if (!isLoaded) {
            return (
                <Loading />
            )
        }
        else {
            // console.log(this.state.result);
            return (
                <>
                    <br />
                    <center>
                        <div className="weather">
                            <h1>Weather</h1>
                            <img src={this.state.result['current']['condition']['icon']} alt={this.state.result['current']['condition']['text']} />

                            <div>{this.state.result['location']['name']}, {this.state.result['location']['region']}</div>

                            <div>{this.state.result['location']['country']}</div>

                            <span><small> Last Updated : {this.state.result['current']['last_updated']} </small></span>

                            <button className='updateWeather' onClick={this.setNewState}>&#10227;</button>
                            <br />
                            <br />

                            <div className="forecast">
                                <div className="max_temp">Max. Temperature : {this.state.result['forecast']['forecastday'][0]['day']['maxtemp_c']} °C</div>

                                <div className="min_temp">Min. Temperature : {this.state.result['forecast']['forecastday'][0]['day']['mintemp_c']} °C</div>
                            </div>

                            <span className='currentTemperature'>{this.state.result['current']['temp_c']} °C</span>
                        </div>
                    </center>
                </>
            )
        }
    }
}
