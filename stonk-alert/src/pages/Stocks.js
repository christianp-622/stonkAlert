import React from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink } from 'react-router-dom';

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

//stock display components
import Stock from '../components/Stock';
import Stock2 from '../components/Stock2';
import Stock3 from '../components/Stock3';

//logo pngs
import AMCLOGO from '../images/AMC.png';
import BBLOGO from '../images/BB.png';
import GMELOGO from '../images/GME.png';

//get the data from the json
const data = require("../tempStockData.json");



/*renders the stock cards for each stock in the Json*/
function render_stock(stock){
   let logo = stock.ticker === "AMC" ? AMCLOGO : stock.ticker === "GME" ? GMELOGO : BBLOGO
   let tempNewsID = stock.ticker === "AMC" ? "2" : stock.ticker === "GME" ? "1" : "3"
   return (
   <div className="card-bg w-100 border d-flex flex-column">
      <div className="p-4 d-flex flex-column h-100">
         <div className="d-flex align-items-center justify-content-between">
               <h2 class="ticker-title text-light">${stock.ticker}</h2>

         </div>
         <img src={logo} class="stock-logo" alt="Stock logo image"></img>
         <p className="my-4 text-left text-light">
            <strong>Company Name: </strong>{stock.name}
            <br></br>
            <strong>Price: </strong> {stock.price}
            <br></br>
            <strong>Sector: </strong> {stock.sector}
            <br></br>
            <strong>Exchange: </strong>{stock.exchange}
            <br></br>
            <strong>Trade Score/Sentiment: </strong>{stock.tradescore}
            <br></br>
            <strong>Investing Score: </strong>{stock.invscore}
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

            <NavLink exact to={"/news/"+tempNewsID} activeClassName="activeClicked">
               <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 News about the stock
               <i className="fas fa-arrow-right ml-1"></i>
               </p>
            </NavLink>


            
         </div>
   </div>
   );
}
 
const Stocks = () => {
   const stockList = []
   data.stocks.forEach(stock => {
      stockList.push(render_stock(stock))
   });

   const table = Stock_Table();

    return (
       <div className="home d-flex">
         <div>
            <Sidebar />
         </div>
         <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "100%" }}>
               <div style={{ height: "calc(100%)", overflowY: "scroll" }}>
                  <div className="d-flex card-section">
                     <div className="cards-container">
                     {stockList}
                     </div>
                  
                  
                  
                  
                  </div>
                  <div className="d-flex card-section">
                     <div className="stock-container">
                        <div className="card-bg w-100 border d-flex flex-column">
                           <div className="p-4 d-flex flex-column h-100">
                              {table}
                           </div>
                        </div>
                     </div>
                  </div>
                 
               </div>
          </div>
         </div>
      </div>
    );
}
 

/* component for individual Stock pages */
const Stock_Page = () => {
   let {id} = useParams();
   let stock = {};
   /* Search for the stock in the json */
   for (const stocks of data.stocks) {

         if (stocks.ticker === id) {
            stock = stocks;
            break;
         }

   }
   /* temp code for the hard code. Find better way later :p */
   let graph = stock.ticker === "AMC" ? <Stock /> : stock.ticker === "GME" ? <Stock2 /> : <Stock3 />
   let tempNewsID = stock.ticker === "AMC" ? "2" : stock.ticker === "GME" ? "1" : "3"

   /* */
   return (
      <div className="home d-flex">
         <div>
            <Sidebar />
         </div>
         <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "100%" }}>
               <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
                  <div className="d-flex card-section">
                     <div className="stock-container">

                        <div className="card-bg w-100 border d-flex flex-column">
                           <div className="p-4 d-flex flex-column h-100">
                              <NavLink exact to="/stocks/" activeClassName="activeClicked">
                                    <p className="c-p mt-0 text-light font-weight-bold text-left mb-auto">

                                    <i className="fas fa-arrow-left mr-1"></i>
                                          View Other Stocks
                                    </p>
                              </NavLink>
                              <div className="align-items-center justify-content-between">
                                    <h1 class="ticker-title text-light">${stock.ticker}</h1> 
                                    <h2 class = "ticker-title text-light"> {stock.name}</h2>
                              </div>
                              <div style={{margin: "10px auto"}}>
                                 {graph}
                              </div>
                              <div class = "stock-info">
                                 <p className="my-4 text-left text-light">

                                    <u><h4> Stock Information</h4></u>
                                    <strong>Price: </strong> {stock.price}
                                    <br></br>
                                    <strong>Sector: </strong> {stock.sector}
                                    <br></br>
                                    <strong>Exchange: </strong>{stock.exchange}
                                    <br></br>
                                   

                                 </p>

                                 {/* The below is mostly from Styvio. The above stats should be from a mix of alpha and styvio api*/}

                                 <p className="my-4 text-left text-light">
                                    <u><h4> Stock Impression</h4></u>
                                    
                                    <strong>Trade Score: </strong>{stock.tradescore}
                                    <br></br>

                                    <strong>Investing Score:</strong> {stock.invscore}
                                    <br></br>
                                 </p>

                              </div>
                                 
                           
                                 
                              <NavLink exact to={"/companies/"+stock.ticker} activeClassName="activeClicked">
                                 <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                      More info about the company
                                 <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              </NavLink>

                              <NavLink exact to={"/news/"+tempNewsID} activeClassName="activeClicked">
                                 <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                      News about the stock
                                 <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              </NavLink>


                              

                              </div>
                        </div>







                     </div>
                  </div>
                     
               </div>
          </div>
         </div>
      </div>
   );
}
const Stock_Table = () => {

   return(
   <BootstrapTable data={ data.stocks }>
            <TableHeaderColumn dataField='ticker' isKey dataSort={ true }>Ticker</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={ true }>Company Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort={ true }>Stock Price</TableHeaderColumn>
            <TableHeaderColumn dataField='sector' dataSort={ true }>Sector</TableHeaderColumn>
            <TableHeaderColumn dataField='exchange' dataSort={ true }>Exchange</TableHeaderColumn>
            <TableHeaderColumn dataField='tradescore' dataSort={ true }>Trader Score</TableHeaderColumn>
            <TableHeaderColumn dataField='invscore' dataSort={ true }>Investor Score</TableHeaderColumn>

    </BootstrapTable>
   );
}
export {Stocks, Stock_Page,Stock_Table};