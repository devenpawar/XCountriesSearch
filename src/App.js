import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://xcountries-backend.azurewebsites.net/all"
      );
      setData(response.data);
      setFilteredData(response.data); // Initially set the filtered data to be the same as the full data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchSelectedCountry = (e) => {
    const selectedCountry = e.target.value.toLowerCase();
    const filteredCountries = data.filter((country) =>
      country.name.toLowerCase().includes(selectedCountry)
    );
    setFilteredData(filteredCountries);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <input
        onChange={fetchSelectedCountry}
        type="text"
        placeholder="Search by country name..."
        style={{ width: "500px", padding: "0.3rem", margin: "0.5rem" }}
      />
      <Grid container style={{ padding: "2rem", margin: "1rem" }}>
        {filteredData &&
          filteredData.map((item) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={4}
              lg={2}
              xl={1.5}
              key={item.id}
              style={{
                border: "0.5px solid black",
                padding: "1rem",
                margin: "0.2rem",
                textAlign: "center",
              }}
            >
              <img
                src={item.flag}
                alt={`Flag of ${item.name}`}
                style={{ height: "100px", width: "100px", objectFit: "cover" }}
              />
              <p style={{ margin: "8px 0", fontWeight: "bold" }}>{item.name}</p>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
