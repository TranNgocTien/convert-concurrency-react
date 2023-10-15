// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";

export default function App() {
  const [firstInput, setFirstInput] = useState("USD");
  const [secondInput, setSecondInput] = useState("USD");
  const [amount, setAmount] = useState(null);
  function onHandleSelectFirst(select) {
    setFirstInput(select);
  }
  function onHandleSelectSecond(select) {
    setSecondInput(select);
  }
  function onHanldeAmountInput(amount) {
    setAmount(amount);
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function fecthApi() {
        if (!amount) return;
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstInput}&to=${secondInput}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        console.log(data);
        setAmount(data);
      }
      fecthApi();

      return function () {
        controller.abort();
      };
    },
    [amount, secondInput, firstInput]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => onHanldeAmountInput(e.target.value)}
      />
      <select
        value={firstInput}
        onChange={(e) => onHandleSelectFirst(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondInput}
        onChange={(e) => onHandleSelectSecond(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{amount ? 0 : amount}</p>
    </div>
  );
}
