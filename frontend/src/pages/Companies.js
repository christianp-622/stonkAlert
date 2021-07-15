import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from '../components/StockCard'

/*Table components */
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

const options = {
   onRowClick: function (row) {
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
      const localURL = "https://stonkalert.me/api/companies?limit=15000";
      // const localURL = "http://127.0.0.1:5000/api/companies?limit=15000";
      // const localURL = window.location.protocol + "//" + window.location.hostname + ":5000/api/companies?limit=15000";
      console.log(localURL)
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

   clearAll() {
      this.refs.name.cleanFiltered();
      this.refs.industry.cleanFiltered();
      this.refs.country.cleanFiltered();
      this.refs.exchange.cleanFiltered();
      this.refs.stock.cleanFiltered();
   }

   render() {
      let companies = this.state.companies;
      let companyTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
   </Spinner>
   </div>;
      if (typeof companies != "undefined" && companies != null && companies.length != null && companies.length > 0) {
         companyTable = <BootstrapTable data={companies} options={options} striped hover pagination version="4" search multiColumnSearch>
            <TableHeaderColumn ref='name' dataField='name' isKey dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Name</TableHeaderColumn>
            <TableHeaderColumn ref='industry' dataField='industry' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Industry</TableHeaderColumn>
            <TableHeaderColumn ref='country' dataField='country' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Country</TableHeaderColumn>
            <TableHeaderColumn ref='exchange' dataField='exchange' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Exchange</TableHeaderColumn>
            <TableHeaderColumn ref='stock' dataField='stock' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Symbol</TableHeaderColumn>
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
                                    <h4 className="m-0 h1 font-weight-bold text-light">Companies</h4>
                                 </p>
                                 {companyTable}
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

export default Companies;