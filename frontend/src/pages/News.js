import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from '../components/StockCard'
import Button from 'react-bootstrap/Button'

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

const options = {
   onRowClick: function(row) {
      window.location.href = "/article/" + row.id;
   }
};

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
      // let localURL = "http://stonkalert.me/api/news?limit=15000";
      // let localURL = "http://127.0.0.1:5000/api/news?limit=15000";
      const localURL = window.location.protocol + window.location.hostname + "/api/news?limit=15000";
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
 
   render() {
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
                          <BootstrapTable data={ this.state.news } options={options} striped hover pagination version="4" search multiColumnSearch>
                             <TableHeaderColumn dataField='headline' isKey dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Title</TableHeaderColumn>
                             <TableHeaderColumn dataField='datetime' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Date</TableHeaderColumn>
                             <TableHeaderColumn dataField='source' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Source</TableHeaderColumn>
                             <TableHeaderColumn dataField='ticker' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Symbol</TableHeaderColumn>
                             <TableHeaderColumn dataField='company' dataSort={ true } thStyle={ { color: 'white' } } tdStyle={ { color: 'white' } }>Company</TableHeaderColumn>
                          </BootstrapTable>
                          <Button href="/news/" variant="outline-light">Refresh All News</Button>{' '}
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