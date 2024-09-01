import { request } from "express";

export const stationAnalytics = {
    getLowestReport(station) {
      let lowestReport = null;
      if (station.reports.length > 0) {
        lowestReport = station.reports[0];
        for (let i = 1; i < station.reports.length; i++) {
          if (station.reports[i].code < lowestReport.code) {
            lowestReport = station.reports[i];
          }
        }
      }
      return lowestReport;
    },

    codeToImage(weatherCode) {
      let weatherImage = ""
      if (weatherCode === 0) {
        weatherImage = "/images/sun.png";
      } else if (weatherCode >= 200 && weatherCode <= 232) {
        weatherImage = "https://openweathermap.org/img/wn/11d@2x.png";
      } else if (weatherCode >= 51 && weatherCode <= 67) {
        weatherImage = "/images/rain.png";
      } else if (weatherCode >= 71 && weatherCode <= 77) {
        weatherImage = "/images/snow.png";
      }
  
      return weatherImage;
    },
  };
  