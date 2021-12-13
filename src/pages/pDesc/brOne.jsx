import React, { Component } from 'react';
import './brOne.less';
import axios from 'axios';
import weather from 'images/weather.png';


class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
  }

  componentDidMount() {
    this.getWeatherInfo(window.city);
  }

  componentWillMount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  getWeatherInfo(city) {
    const that = this;
    axios // 填自己的KEY
      .get(`https://free-api.heweather.net/s6/weather/now?location=${city}&key=7b24a89f23254ae2afce69a2e00e529a`)
      .then((resolve) => {
        const { data } = resolve;
        console.log(data);

        if (that.timer1) {
          clearTimeout(that.timer1);
        }
        that.timer1 = setTimeout(() => { that.getWeatherInfo(window.city); }, 60 * 60 * 1000);
        that.setState({ weatherData: data });
      // return data.status === 'ok' ? data : null
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const { weatherData } = this.state;
    const { weather } = this.props;
    return (
      <div className="brone">
        <div className="weather">
          {/* <img src={weather} /> */}
          <img src={weatherData !== null ? `https://cdn.heweather.com/img/plugin/190516/icon/c/${weatherData.HeWeather6[0].now.cond_code}d.png` : ''} alt="" style={{ width: '55px' }} />
          <span className="temp">温度：{weatherData !== null ? weatherData.HeWeather6[0].now.tmp : ''}℃</span>
          <span className="weatherName">{weatherData !== null ? weatherData.HeWeather6[0].now.cond_txt : ''}</span>
        </div>
        <div className="desc">
          <span>湿度：{weather === '' ? '' : weather.humd === null ? 0 : parseInt(weather.humd)}%</span>
          <span>风速：{weather === '' ? '' : weather.windspeed === null ? 0 : parseInt(weather.windspeed)}m/s</span>
          <span>风向：{weather === '' ? '' : weather.winddirect === null ? 0 : parseInt(weather.winddirect)}</span>

        </div>


      </div>
    );
  }
}

export default PageComponent;
