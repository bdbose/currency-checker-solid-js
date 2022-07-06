import axios from 'axios';
import { createEffect, createSignal } from 'solid-js';

function App() {
  const [currencyData, setCurrencyData] = createSignal([]);
  const [currencyDetails, setCurrencyDetails] = createSignal({});
  const getCurrencyData = async () => {
    try {
      const res = await axios.get(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
      );
      setCurrencyData(formatData(res.data, 1));
    } catch (err) {
      console.log(err);
      setCurrencyData([]);
    }
  };

  const formatData = (data, flag) => {
    if (flag == 1)
      return Object.keys(data).map((ele) => {
        return {
          token: ele,
          name: data[ele],
        };
      });
    return Object.keys(data).map((ele) => {
      return {
        name: ele,
        price: data[ele],
      };
    });
  };
  createEffect(() => {
    getCurrencyData();
  }, []);

  const onSetCurrency = async (currency) => {
    try {
      const res = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`,
      );
      setCurrencyDetails(formatData(res.data[currency], 2));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class='main'>
      <h1>Select Currency</h1>
      <select onChange={(e) => onSetCurrency(e.target.value)}>
        {currencyData().length > 0 &&
          currencyData().map((ele) => (
            <option value={ele.token}>{ele.name}</option>
          ))}
      </select>
      <section>
        <h2>Data:</h2>
        {currencyDetails().length > 0 &&
          currencyDetails().map((ele) => (
            <div className='token-card'>
              <span>Token: {ele.name}</span>
              <span>Price: {ele.price}</span>
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
