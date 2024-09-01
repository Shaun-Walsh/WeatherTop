import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const reportController = {
    async index(request, response) {
        const station = await stationStore.getStationsById(request.params.id);
        
        console.log(weatherImage);
        const viewData = {
          title: "Station",
          station: station,
          lowestReport: lowestReport,
        };
        response.render("station-view", viewData);
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
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
    console.log(`Updating Report ${reportId} from Station ${stationId}`);
    const report = await reportStore.getReportById(reportId);
    await reportStore.updateReport(report, updatedReport);
    response.redirect("/station/" + stationId);
  },
};