import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, addStockRemovePortfolio }) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock,i) => {
        return <Stock key={stock.id+i} asset='portfolio' stock={stock} addStockRemovePortfolio={addStockRemovePortfolio} />
      })}
    </div>
  );
}

export default PortfolioContainer;
