import wepy from 'wepy';
import base from './base';
export default class api extends base {
  static wxlogin() {
    return wepy.login().then(res => {
      if (res.errMsg === 'login:ok') {
        return res.code;
      }
    });
  }

  static reqLinesViaBaidu(code) {
    const url = `https://map.baidu.com/?qt=subways&c=${code}&format=json`;
    return this.get(url).then(res => {
      return res.subways.l;
    });
  }

  static reqLinesViaGaode(code, cityname) {
    const url =
      `https://map.amap.com/service/subway?srhdata=${code}_drw_${cityname}.json`;
    return this.get(url).then(res => {
      return res.l;
    });
  }

  static reqSchedulesViaGaode(code, cityname) {
    const url =
      `https://map.amap.com/service/subway?srhdata=${code}_info_${cityname}.json`;
    return this.get(url).then(res => {
      return res.l;
    });
  }

  static getWeather(amap) {
    return new Promise((resolve, reject) => {
      amap.getWeather({
        success: function(data) {
          resolve(data);
        },
        fail: function(info) {
          reject(false);
        }
      });
    });
  }

  static getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          resolve(res);
        },
        fail(res) {
          reject(false);
        }
      });
    });
  }
}
