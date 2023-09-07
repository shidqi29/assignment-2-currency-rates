import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const symbols = "CAD,IDR,JPY,CHF,EUR,GBP";
  const baseUrl = "https://api.currencyfreaks.com";
  const url = `${baseUrl}/v2.0/rates/latest?apikey=${apiKey}&symbols=${symbols}`;

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const buyRate = (value) => {
    //buy rate is 5% bigger than exchange rate
    return (value * 1.05).toFixed(4);
  };

  const sellRate = (value) => {
    //sell rate is 5% smaller than exchange rate
    return (value * 0.95).toFixed(4);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <table>
          <thead className="table-header">
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data.rates).map(([key, value]) => (
                <tr key={value}>
                  <td>{key}</td>
                  <td>{buyRate(value)}</td>
                  <td>{Number(value).toFixed(6)}</td>
                  <td>{sellRate(value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <p>Rates are based from 1 {data?.base}</p>
        <p>
          This application uses API from <a href={baseUrl}>{baseUrl}</a>
        </p>
      </div>
    </>
  );
}

export default App;
