import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from '../components/StockCard'

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

//stock display components
import Stock from '../components/Stock';

const options = {
   onRowClick: function(row) {
      // window.location.href = `/stocks/${row.ticker}`;
      window.location.href = "/stocks/" + row.ticker;
   }
};

class Stocks extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       stocks: []
     }
   }
 
   componentDidMount() {
     this.getStocks();
   }
 
   getStocks() {
      // const localURL = "http://stonkalert.me/api/stocks?limit=15000";
      // const localURL = "http://127.0.0.1:5000/api/stocks?limit=15000";
      const localURL = window.location.protocol + "//" + window.location.hostname + "/api/stocks?limit=15000";
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
               stocks: data
             });
          }
        )
   }
 
   render() {
     return (
       
      <div className="home d-flex">
        <div>
           <Sidebar />
        </div>
        <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
           <div style={{ height: "100%" }}>
              <div style={{ height: "calc(100%)", overflowY: "scroll" }}>
                 {/* <div className="d-flex card-section">
                    <div className="cards-container">
                       {this.state.stocks.map((stock) => (
                          <StockCard stock={stock} />
                       ))}
                    </div>
                 </div> */}
                 <div className="d-flex card-section">
                    <div className="stock-container">
                       <div className="card-bg w-100 border d-flex flex-column">
                          <div className="p-4 d-flex flex-column h-100">
                          <p className="my-4 text-center text-light"> 
                                       <h4 className="m-0 h1 font-weight-bold text-light">Stocks</h4>
                          </p>
                          <BootstrapTable data={ this.state.stocks } options={options} striped hover pagination version="4" search multiColumnSearch>
                             <TableHeaderColumn dataField='ticker' isKey dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Ticker</TableHeaderColumn>
                             <TableHeaderColumn dataField='price' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Stock Price</TableHeaderColumn>
                             <TableHeaderColumn dataField='marketcap' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Market Cap</TableHeaderColumn>
                             <TableHeaderColumn dataField='sector' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Sector</TableHeaderColumn>
                             <TableHeaderColumn dataField='tradescore' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Trader Score</TableHeaderColumn>
                             <TableHeaderColumn dataField='investscore' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Investor Score</TableHeaderColumn>
                          </BootstrapTable>
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
 
 export default Stocks;