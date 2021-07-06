import React from 'react';
import { NavLink } from 'react-router-dom';

const StockCard = ({stock}) => {
    // let logo = stock.ticker === "AMC" ? AMCLOGO : stock.ticker === "GME" ? GMELOGO : BBLOGO
    // let tempNewsID = stock.ticker === "AMC" ? "2" : stock.ticker === "GME" ? "1" : "3"
    return (
    <div className="card-bg w-100 border d-flex flex-column">
       <div className="p-4 d-flex flex-column h-100">
          <div className="d-flex align-items-center justify-content-between">
                <h2 class="ticker-title text-light">${stock.ticker}</h2>
 
          </div>
          {/* <img src={logo} class="stock-logo" alt="Stock logo image"></img> */}
          <p className="my-4 text-left text-light">
             <strong>Company Name: </strong>{stock.name}
             <br></br>
             <strong>Price: </strong> {stock.price}
             <br></br>
             <strong>Sector: </strong> {stock.sector}
             <br></br>
             <strong>Market Cap: </strong>{stock.marketcap}
             <br></br>
             <strong>Trade Score/Sentiment: </strong>{stock.tradescore}
             <br></br>
             <strong>Investing Score: </strong>{stock.investscore}
             <br></br>
 
 
          </p>
             
             <NavLink exact to={"/stocks/"+stock.ticker} activeClassName="activeClicked">
                <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                  More info about the stock
                <i className="fas fa-arrow-right ml-1"></i>
                </p>
             </NavLink>
             <NavLink exact to={"/companies/"+stock.ticker} activeClassName="activeClicked">
                <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                  More info about the company
                <i className="fas fa-arrow-right ml-1"></i>
                </p>
             </NavLink>
 
             <NavLink exact to={"/news/"} activeClassName="activeClicked">
                <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                  News about the stock
                <i className="fas fa-arrow-right ml-1"></i>
                </p>
             </NavLink>
 
 
             
          </div>
    </div>
    );
};

export default StockCard;
