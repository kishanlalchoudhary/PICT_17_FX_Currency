import { useState } from "react";

// Assets
import backgroundImage from "../assets/home.jpg";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("charts");

  const mainStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
    padding: "50px",
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <main style={mainStyle}>
        <section className="hero-section">
          <div className="container text-center">
            <h1>Empower Your Currency Analysis</h1>
            <p>
              Effortlessly track and analyze exchange rates with our intuitive
              dashboard.
            </p>
            <a href="/dashboard" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2>Key Features</h2>
            <div className="row">
              <div className="col-md-4">
                <h3>Multi-Currency Analysis</h3>
                <p>
                  Compare exchange rates between various currencies over
                  different intervals.
                </p>
              </div>
              <div className="col-md-4">
                <h3>Customizable Charts</h3>
                <p>
                  Select weekly, monthly, quarterly, or yearly views for
                  detailed analysis.
                </p>
              </div>
              <div className="col-md-4">
                <h3>Lowest Rate Identification</h3>
                <p>
                  Efficiently pinpoint dates with the lowest exchange rates for
                  informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="m-4">
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" id="myTab">
                <li className="nav-item w-50 d-flex justify-content-center">
                  <button
                    onClick={() => handleTabChange("conversion")}
                    className={`nav-link btn w-100 ${
                      activeTab === "conversion" ? "active" : "nav-text"
                    }`}
                  >
                    <p
                      className="fas fa-money-bill-transfer text-center"
                      style={{ color: "#000000" }}
                    >
                      CONVERSION
                    </p>
                  </button>
                </li>
                <li className="nav-item w-50 d-flex justify-content-center">
                  <button
                    onClick={() => handleTabChange("charts")}
                    className={`nav-link btn w-100 ${
                      activeTab === "charts" ? "active" : "nav-text"
                    }`}
                  >
                    <i
                      className="fas fa-chart-line"
                      style={{ color: "#000000" }}
                    ></i>{" "}
                    CHARTS
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {/* Tab content */}
              {activeTab === "conversion" && (
                <div className="tab-pane fade show active">
                  <h5 className="card-title">Currency Conversion</h5>
                  <p className="card-text">
                    Perform quick currency conversions with ease. Enter the
                    amount to convert, select the currencies, and get the
                    converted amount instantly.
                  </p>
                  <a href="/convert" className="btn btn-primary">
                    CURRENCY CONVERSION
                  </a>
                </div>
              )}
              {activeTab === "charts" && (
                <div className="tab-pane fade show active">
                  <h5 className="card-title">Exchange Rate Analysis</h5>
                  <p className="card-text">
                    Visualize exchange rate trends with interactive charts.
                    Select different time intervals for detailed analysis.
                  </p>
                  <a href="/charts" className="btn btn-primary">
                    VIEW CHARTS
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
