import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import api from "../api/api";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getCurrencyNames } from "../../../server/controllers/currencyControllers";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement);

const Charts = () => {
  const [xCoordinates, setXCoordinates] = useState([]);
  const [yCoordinates, setYCoordinates] = useState([]);
  const [maxValue, setMaxValue] = useState({});
  const [minValue, setMinValue] = useState({});
  const [key, setKey] = useState("duration");
  const [currencyName, setCurrencyName] = useState("Currency 2");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currencyNames, setCurrencyNames] = useState([]);

  const data = {
    labels: xCoordinates,
    datasets: [
      {
        label: "First dataset",
        data: yCoordinates,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    tension: 0,
  };

  const getPricesByDuration = async () => {
    try {
      const response = await api.get(
        `/duration?currency_name=${currencyName}&start_date=${startDate}&end_date=${endDate}`
      );
      setMaxValue(response.data.max);
      setMinValue(response.data.min);
      setXCoordinates(response.data.x_coordinates);
      setYCoordinates(response.data.y_coordinates);
    } catch (err) {
      console.log(err);
    }
  };

  const getPricesTabs = async () => {
    try {
      const response = await api.get(
        `/${key}?currency_name=${currencyName}&start_date=${startDate}&end_date=${endDate}`
      );
      setMaxValue(response.data.max);
      setMinValue(response.data.min);
      setXCoordinates(response.data.x_coordinates);
      setYCoordinates(response.data.y_coordinates);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrencyNames = async () => {
    try {
      const response = await api.get(`/currencyNames`);
      setCurrencyNames(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrencyNames();
  }, []);

  useEffect(() => {
    if (key === "duration") {
      getPricesByDuration();
    } else {
      getPricesTabs();
    }
  }, [key, currencyName, startDate, endDate]);

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="duration" title="Duration">
          <div className="w-50">
            <div>
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                name="start_date"
              />
            </div>
            <div>
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                name="end_date"
              />
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 w-50">
            <select value="USD" className="form-select">
              <option value="USD">USD</option>
            </select>
            <select
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <Line options={options} data={data} />
        </Tab>
        <Tab eventKey="weekly" title="Weekly">
          <Line options={options} data={data} />
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          <Line options={options} data={data} />
        </Tab>
        <Tab eventKey="quarterly" title="Quarterly">
          <Line options={options} data={data} />
        </Tab>
        <Tab eventKey="yearly" title="Yearly">
          <Line options={options} data={data} />
        </Tab>
      </Tabs>
    </>
  );
};

export default Charts;
