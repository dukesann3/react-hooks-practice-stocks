import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, addPortfolio }) {

  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => {
        return <Stock key={stock.id} asset='stock' stock={stock} addPortfolio={addPortfolio} />
      })}
    </div>
  );
}

export default StockContainer;
