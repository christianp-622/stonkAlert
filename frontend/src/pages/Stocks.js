import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from '../components/StockCard'
import Button from 'react-bootstrap/Button'

/*Table components */
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

//stock display components
import Stock from '../components/Stock';
import Spinner from 'react-bootstrap/Spinner'
import Mark from 'mark.js'

function getCaret(direction) {
   if (direction === 'asc') {
      return (
         <span>      <i className="fas fa-arrow-up"></i></span>
      );
   }
   if (direction === 'desc') {
      return (
         <span>      <i className="fas fa-arrow-down"></i></span>
      );
   }
   return (
      <span>      <i className="fas fa-arrow-up"></i><i className="fas fa-arrow-down"></i></span>
   );
}

/* used for the filter dropdown to determine which values to show*/
/* the key is displayed while the value is the actual value is used to sort */
const displayScores = {
   'A+': 'A+',
   'A': 'A',
   'A-': 'A-',
   'B+': 'B+',
   'B': 'B',
   'B-': 'B-',
   'C': 'C'
};


/* used to compare two scores */
const stockScore = {
   'A+': 0,
   'A': 1,
   'A-': 2,
   'B+': 3,
   'B': 4,
   'B-': 5,
   'C': 6,

}

/* const stockScores = {
   0: 'A+',
   1: 'A',
   2: 'A-',
   3: 'B+',
   4: 'B',
   5: 'B-',
   6: 'C',
 }; */

/* function enumFormatter(cell,row, enumObject) {
   return enumObject[cell];
} */

function sortByScore(a, b, order, field) {
   console.log(field);
   let A = stockScore[a[field]];
   let B = stockScore[b[field]];
   if (order == 'desc') {
      return A - B
   } else {
      return B - A
   }
}

function formatFloat(cell) {
   return parseFloat(cell);
}

class Stocks extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         stocks: [],
         search: ""
      }
   }

   componentDidMount() {
      this.getStocks();
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   doSearch(text) {
      var instance = new Mark(document.querySelectorAll("tbody"));
      instance.unmark(text); // clears old text edge case
      instance.mark(text);
      console.log(instance);
      this.state.search = text;
   }

   onSearchChange = (searchText, colInfos, multiColumnSearch) => {
      console.log(searchText);
      this.doSearch(searchText);
      this.interval = setInterval(() => this.doSearch(this.state.search), 1000);
   }

   getStocks() {
      const localURL = "https://stonkalert.me/api/stocks?limit=15000";
      // const localURL = "http://127.0.0.1:5000/api/stocks?limit=15000";
      // const localURL = window.location.protocol + "//" + window.location.hostname + ":5000/api/stocks?limit=15000";
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

   clearAll() {
      this.refs.ticker.cleanFiltered();
      this.refs.price.cleanFiltered();
      this.refs.marketcap.cleanFiltered();
      this.refs.sector.cleanFiltered();
      this.refs.tradescore.cleanFiltered();
      this.refs.investscore.cleanFiltered();
   }

   renderTotal(start, to, total) {
      return (
         <p style={{ color: 'white' }}>
            Showing rows {start} to {to} of {total} instances
         </p>
      );
   }

   render() {
      const options = {
         onSearchChange: this.onSearchChange,
         paginationShowsTotal: this.renderTotal,
         onRowClick: function (row) {
            // window.location.href = `/stocks/${row.ticker}`;
            window.location.href = "/stocks/" + row.ticker;
         }
      };
      let stocks = this.state.stocks;
      console.log(this.state.stocks);
      console.log(window.location.protocol);
      console.log(window.location.hostname);
      let stockTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof stocks != "undefined" && stocks != null && stocks.length != null && stocks.length > 0) {
         stockTable = <BootstrapTable data={this.state.stocks} options={options} striped hover pagination version="4" search searchPlaceholder='Multi-Word and Column Search' multiColumnSearch>
            <TableHeaderColumn ref='ticker' dataField='ticker' isKey caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Ticker</TableHeaderColumn>
            <TableHeaderColumn ref='price' dataField='price' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'NumberFilter', defaultValue: { comparator: '=' }, placeholder: "Enter" }}
               dataFormat={formatFloat}
               filterFormatted>Stock Price</TableHeaderColumn>
            <TableHeaderColumn ref='marketcap' caretRender={getCaret} dataField='marketcap' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'NumberFilter', defaultValue: { comparator: '=' }, placeholder: "Enter" }}>Market Cap</TableHeaderColumn>
            <TableHeaderColumn ref='sector' caretRender={getCaret} dataField='sector' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Sector</TableHeaderColumn>
            <TableHeaderColumn ref='tradescore' caretRender={getCaret} dataField='tradescore' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filterFormatted sortFunc={sortByScore} formatExtraData={stockScore}
               filter={{ type: 'SelectFilter', options: displayScores, condition: 'eq', placeholder: "Select" }}>Trader Score</TableHeaderColumn>
            <TableHeaderColumn ref='investscore' caretRender={getCaret} dataField='investscore' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filterFormatted sortFunc={sortByScore} formatExtraData={stockScore}
               filter={{ type: 'SelectFilter', options: displayScores, condition: 'eq', placeholder: "Select" }}>Investor Score</TableHeaderColumn>
         </BootstrapTable>;
      }
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
                                 <p className="my-4 text-center text-light">
                                    <h4 className="m-0 h1 font-weight-bold text-light">Stocks</h4>
                                 </p>
                                 {stockTable}
                                 <div style={{ margin: "10px auto" }}><Button onClick={this.clearAll.bind(this)} variant="outline-light">Clear Filters</Button>{' '}</div>
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