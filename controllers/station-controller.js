import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const lowestReport = stationAnalytics.getLowestReport(station);
    const weatherImage = stationAnalytics.codeToImage(lowestReport.code);
    console.log(weatherImage);
    const viewData = {
      title: "Station",
      station: station,
      lowestReport: lowestReport,
      weatherImage: weatherImage
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      current: request.body.current,
      temp: Number(request.body.temp),
      maxTemp: Number(request.body.maxTemp),
      minTemp: Number(request.body.minTemp),
      wind: Number(request.body.wind),
      windDirection: request.body.windDirection,
      maxWind: Number(request.body.maxWind),
      minWind: Number(request.body.minWind),
      pressure: Number(request.body.pressure),
      maxPressure: Number(request.body.maxPressure),
      minPressure: Number(request.body.minPressure),
    };
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${reportId}`);
    await reportStore.deleteReport(request.params.reportId);
    response.redirect("/station/" + stationId);
  },

};