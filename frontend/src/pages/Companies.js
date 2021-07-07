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

const options = {
   onRowClick: function(row) {
      window.location.href = "/companies/" + row.stock;
   }
};

class Companies extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       companies: []
     }
   }
 
   componentDidMount() {
     this.getCompanies();
   }
 
   getCompanies() {
      const localURL = "http://127.0.0.1:5000/api/companies?limit=15000";
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
               companies: data
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
                          <BootstrapTable data={ this.state.companies } options={options} striped hover pagination version="4">
                             <TableHeaderColumn dataField='name' isKey dataSort={ true }>Name</TableHeaderColumn>
                             <TableHeaderColumn dataField='industry' dataSort={ true }>Industry</TableHeaderColumn>
                             <TableHeaderColumn dataField='country' dataSort={ true }>Country</TableHeaderColumn>
                             <TableHeaderColumn dataField='exchange' dataSort={ true }>Exchange</TableHeaderColumn>
                             <TableHeaderColumn dataField='stock' dataSort={ true }>Symbol</TableHeaderColumn>
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
 
 export default Companies;