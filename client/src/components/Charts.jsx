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
import backgroundImage from "../assets/background.avif";

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

  const mainStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
    padding: "50px",
  };

  const data = {
    labels: xCoordinates,
    datasets: [
      {
        label: "First dataset",
        data: yCoordinates,
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
      setCurrencyNames(response.data);
      console.log(response.data);
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
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="duration" title="Duration">
          <div className="d-flex w-100 gap-10 ps-20">
            <div className="d-flex align-items-center gap-5">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value), setEndDate(e.target.value);
                }}
                name="start_date"
              />
            </div>
            <div className="d-flex align-items-center gap-5">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                name="end_date"
              />
            </div>
            <div className="d-flex align-items-center gap-3 w-50">
              <select className="form-select">
                <option value="USD">USD</option>
              </select>
              <select
                value={currencyName}
                onChange={(e) => setCurrencyName(e.target.value)}
                className="form-select"
              >
                <option value="currency 2">Currency 2</option>
                {currencyNames.map((item) => (
                  <option key={item.currency_name} value={item.currency_name}>
                    {item.currency_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {minValue && (
            <div className="ps-20 d-flex gap-5">
              <h5>Min Value : {minValue.conversion_rate}</h5>
              <h5>Date :{minValue.date}</h5>
            </div>
          )}
          {maxValue && (
            <div className="ps-20 d-flex gap-5">
              <h5>Max Value : {maxValue.conversion_rate}</h5>
              <h5>Date : {maxValue.date}</h5>
            </div>
          )}
          <div></div>
          <Line
            options={options}
            data={data}
            className="mx-auto my-7 w-75 h-75"
          />
        </Tab>
        <Tab eventKey="weekly" title="Weekly">
          <div className="d-flex align-items-center gap-3 w-50">
            <select className="form-select">
              <option value="USD">USD</option>
            </select>
            <select
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              {currencyNames.map((item) => (
                <option key={item.currency_name} value={item.currency_name}>
                  {item.currency_name}
                </option>
              ))}
            </select>
          </div>
          <Line options={options} data={data} className="w-75 h-50 mx-auto" />
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          <div className="d-flex align-items-center gap-3 w-50">
            <select className="form-select">
              <option value="USD">USD</option>
            </select>
            <select
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              {currencyNames.map((item) => (
                <option key={item.currency_name} value={item.currency_name}>
                  {item.currency_name}
                </option>
              ))}
            </select>
          </div>
          <Line options={options} data={data} className="w-75 h-50 mx-auto" />
        </Tab>
        <Tab eventKey="quarterly" title="Quarterly">
          <div className="d-flex align-items-center gap-3 w-50">
            <select className="form-select">
              <option value="USD">USD</option>
            </select>
            <select
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              {currencyNames.map((item) => (
                <option key={item.currency_name} value={item.currency_name}>
                  {item.currency_name}
                </option>
              ))}
            </select>
          </div>
          <Line options={options} data={data} className="w-75 h-50 mx-auto" />
        </Tab>
        <Tab eventKey="yearly" title="Yearly">
          <div className="d-flex align-items-center gap-3 w-50">
            <select className="form-select">
              <option value="USD">USD</option>
            </select>
            <select
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              {currencyNames.map((item) => (
                <option key={item.currency_name} value={item.currency_name}>
                  {item.currency_name}
                </option>
              ))}
            </select>
          </div>
          <Line options={options} data={data} className="w-75 h-50 mx-auto" />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Charts;
