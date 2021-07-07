import React, {useState} from 'react';
import Sidebar from './Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class Company_Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        company: {}
      }
   }
  
    componentDidMount() {
      this.getCompany();
    }
    
  
    getCompany() {
       const ticker = this.props.match.params.id;
       const localURL = "http://127.0.0.1:5000/api/company?symbol=" + ticker;
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
                company: data
              });
           }
         )
    }
    

    render() {
        let company = this.state.company;

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
                                 <NavLink exact to="/companies/" activeClassName="activeClicked">
                                    <p className="c-p mt-0 text-light font-weight-bold text-left mb-auto">
                                       <i className="fas fa-arrow-left mr-1"></i>
                                       View Other Companies
                                    </p>
                                 </NavLink>
                                 <div className="align-items-center justify-content-between">
                                    {/*<img src={logo} className="img-fluid" />*/}
                                    <p className="my-4 text-center text-light"> 
                                       <h4 className="m-0 h5 font-weight-bold text-light">{company.name}</h4>
                                    </p>
                                    <hr />
                                    <p className="my-4 text-center text-light"> 
                                       <h4 className="m-0 h5 font-weight-bold text-light">About</h4>
                                       {company.description}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Industry</h4>
                                       {company.industry}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Symbol</h4>
                                       {company.stock}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Exchange</h4>
                                       {company.exchange}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <a className="m-0 h5 font-weight-bold text-light" href={"//" + company.website}>Visit Website</a>
                                       <i className="fas fa-arrow-right ml-1"></i>
                                    </p>
                                    <hr />
                                 </div>
                                 <NavLink exact to={"/stocks/" + company.stock} activeClassName="activeClicked">
                                    <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                       More about the stock
                                       <i className="fas fa-arrow-right ml-1"></i>
                                    </p>
                                 </NavLink>
   
                                 <NavLink exact to={"/news/" + company.stock} activeClassName="activeClicked">
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
        )
    }
  }
  
  export default Company_Page;