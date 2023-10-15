import React from "react";

function Stock({stock, addPortfolio, addStockRemovePortfolio, asset}) {

  const {ticker, name, type, price} = stock;

  function stockPortfolioExchange(){
    if(asset === 'stock'){
      addPortfolio(stock);
      return;
    }
    addStockRemovePortfolio(stock);
    return;
  }

  return (
    <div>
      <div className="card" onClick={() => stockPortfolioExchange()}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: ${price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
