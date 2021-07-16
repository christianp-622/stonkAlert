import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from '../components/StockCard'
import Button from 'react-bootstrap/Button'
import Mark from 'mark.js'

/*Table components */
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Spinner from 'react-bootstrap/Spinner'

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

class News extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         news: []
      }
   }

   componentDidMount() {
      this.getNews();
   }

   getNews() {
      let localURL = "https://stonkalert.me/api/news?limit=15000";
      // let localURL = "http://127.0.0.1:5000/api/news?limit=15000";
      // let localURL = window.location.protocol + "//" + window.location.hostname + ":5000/api/news?limit=15000";
      let ticker = this.props.match.params.id;
      if (ticker != null && ticker != "" && isNaN(ticker)) { // if text put in news link
         localURL += "&symbol=" + ticker;
         console.log(localURL);
      }

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
                  news: data
               });
            }
         )
   }

   clearAll() {
      this.refs.headline.cleanFiltered();
      this.refs.datetime.cleanFiltered();
      this.refs.source.cleanFiltered();
      this.refs.ticker.cleanFiltered();
      this.refs.company.cleanFiltered();
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
         paginationShowsTotal: this.renderTotal,
         onRowClick: function (row) {
            window.location.href = "/article/" + row.id;
         }
      };
      let news = this.state.news;
      let articleTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof news != "undefined" && news != null && news.length != null && news.length > 0) {
         articleTable = <BootstrapTable data={news} options={options} striped hover pagination version='4' search multiColumnSearch>
            <TableHeaderColumn ref='headline' dataField='headline' isKey caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Title</TableHeaderColumn>
            <TableHeaderColumn ref='datetime' dataField='datetime' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Date</TableHeaderColumn>
            <TableHeaderColumn ref='source' dataField='source' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Source</TableHeaderColumn>
            <TableHeaderColumn ref='ticker' dataField='ticker' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Symbol</TableHeaderColumn>
            <TableHeaderColumn ref='company' dataField='company' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }} filter={{ type: 'TextFilter', placeholder: "Enter" }}>Company</TableHeaderColumn>
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
                                    <h4 className="m-0 h1 font-weight-bold text-light">News</h4>
                                 </p>
                                 {articleTable}
                                 <div style={{ margin: "10px auto" }}><Button onClick={this.clearAll.bind(this)} variant="outline-light">Clear Filters</Button>{' '}</div>
                                 <div style={{ margin: "10px auto" }}><Button href="/news/" variant="outline-light">Refresh All News</Button>{' '}</div>
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

export default News;