import React, {useState} from 'react';
import Sidebar from './Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from './StockCard'

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

import Spinner from 'react-bootstrap/Spinner'

//stock display components
import Stock from './Stock';


class Stock_Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stock: {}
      }
   }
  
    componentDidMount() {
      this.getStock();
    }
    
  
    getStock() {
       const ticker = this.props.match.params.id;
       const localURL = "http://127.0.0.1:5000/api/stock?symbol=" + ticker;
       const pointerToThis = this;
 
       fetch(localURL)
         .then(
           function (response) {
             return response.json();
           }
         )
         .then(
           function (data) {
             console.log(data);
             pointerToThis.setState({
                stock: data
              });
           }
         )
    }
    

    render() {
        let stock = this.state.stock;

         // the render occurs before the retrieval is complete put a spinner in place     
        let graph =<Spinner animation="border" role="status">  
                     <span className="sr-only">Loading...</span> 
                  </Spinner>;
  
         // check if the stock has a proper ticker. if so set graph to Stock
         // this should trigger an update
        if (typeof(stock.ticker) !== 'undefined') {
            graph = <Stock ticker={stock.ticker}/>; 
        }

        console.log(stock.ticker);

        /* */
        return (
           <div className="home d-flex">
              <div>
                 <Sidebar />
              </div>
              <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
                 <div style={{ height: "100%" }}>
                    <div style={{ height: "calc(100%)", overflowY: "scroll" }}>
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
                                         <h2 class = "ticker-title text-light">{stock.companyName}</h2>
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
                                         <strong>Market Cap: </strong>{stock.marketcap}
                                         <br></br>
                                        
     
                                      </p>
     
                                      {/* The below is mostly from Styvio. The above stats should be from a mix of alpha and styvio api*/}
     
                                      <p className="my-4 text-left text-light">
                                         <u><h4> Stock Impression</h4></u>
                                         
                                         <strong>Trade Score: </strong>{stock.tradescore}
                                         <br></br>
     
                                         <strong>Investing Score:</strong> {stock.investscore}
                                         <br></br>
                                      </p>
     
                                   </div>
                                    
                                 
                                   <NavLink exact to={"/companies/"+stock.ticker} activeClassName="activeClicked">
                                      <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                           More about the company
                                      <i className="fas fa-arrow-right ml-1"></i>
                                      </p>
                                   </NavLink>
     
                                   <NavLink exact to={"/news/"+stock.ticker} activeClassName="activeClicked">
                                      <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                           News about this stock
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
        )
    }
  }
  
  export default Stock_Page;