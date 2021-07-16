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
            window.location.href = "/companies/" + row.stock;
         }
      };
      let companies = this.state.companies;
      let companyTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof companies != "undefined" && companies != null && companies.length != null && companies.length > 0) {
         companyTable = <BootstrapTable data={companies} options={options} striped hover pagination version="4" search multiColumnSearch>
            <TableHeaderColumn ref='name' dataField='name' caretRender={getCaret} isKey dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Name</TableHeaderColumn>
            <TableHeaderColumn ref='industry' dataField='industry' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Industry</TableHeaderColumn>
            <TableHeaderColumn ref='country' dataField='country' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Country</TableHeaderColumn>
            <TableHeaderColumn ref='exchange' dataField='exchange' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Exchange</TableHeaderColumn>
            <TableHeaderColumn ref='stock' dataField='stock' caretRender={getCaret} dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }} filter={{ type: 'TextFilter' }}>Symbol</TableHeaderColumn>
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