import React from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

import { useState, useEffect } from "react";

function MainContainer() {

  const APIUrl = 'http://localhost:3001/stocks';

  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [radio, setRadio] = useState('Alphabetically');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(APIUrl)
      .then(response => response.json())
      .then((data) => {
        setStocks(data);
      })
  }, []);

  //make sure that filtered stocks are in component where users can type value

  function addStocks(newStock) {
    setStocks([...stocks, newStock])
  }

  function addPortfolio(newStock) {
    setPortfolio([...portfolio, newStock])
  }

  function removePortfolio(stockToRemove) {
    setPortfolio(portfolio.filter(stock => stock.ticker !== stockToRemove.ticker));
  }

  function addStockRemovePortfolio(newStock) {
    addStocks(newStock);
    removePortfolio(newStock);
  }

  function insertionSortAlphabet(arr) {
    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i];
      let j = i - 1;
      //loop when i index value is less than i-1 index value
      //[...arr, i-3, i-2, i-1, i, i+1,...]
      while (j >= 0 && currentValue.name < arr[j].name) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = currentValue;
    }
    return arr;
  }

  function insertionSortAscendingPrice(arr) {
    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i];
      let j = i - 1;
      //loop when i index value is less than i-1 index value
      //[...arr, i-3, i-2, i-1, i, i+1,...]
      while (j >= 0 && currentValue.price > arr[j].price) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = currentValue;
    }
    return arr;
  }

  const filteredStocks = stocks.filter((stock) => {
    const {type} = stock;
    if(filter === ''){
      return true;
    }
    else if(type.includes(filter)){
      return true;
    }
    return false;
  })

  const sortedStocks = radio === 'Alphabetically' ? insertionSortAlphabet(filteredStocks) : insertionSortAscendingPrice(filteredStocks);

  return (
    <div>
      <SearchBar setRadio={setRadio} radio={radio} setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} addPortfolio={addPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} addStockRemovePortfolio={addStockRemovePortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
