import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar';
import logo from '../images/gme2_transparent.png';
import logo2 from '../images/bb-transparent.png';
import logo3 from '../images/amc_logo.png';
import { NavLink } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard'
import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';

const data = require("../tempCompanyData.json");
const company = data['company'];

const Companies = () => {
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
                     {company.map((company) => (
                           <CompanyCard company={company} />
                        ))}
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
}


/* component for individual Stock pages */
const Company_Page = () => {
   let {id} = useParams();
   let company = {};
   /* Search for the stock in the json */
   for (const companies of data.company) {
         if (companies.ticker === id) {
            company = companies;
            break;
         }

   }
   /* temp code for the hard code. Find better way later :p */
   //let image = company.ticker === "AMC" ? logo3 : stock.ticker === "GME" ? logo : <Stock3 />

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
                                 <img src={logo} className="img-fluid" />
                                 <hr />
                                 <p className="my-4 text-center text-light"> 
                                    <h4 className="m-0 h5 font-weight-bold text-light">About</h4>
                                    {company.about}
                                 </p>

                                 <p className="my-4 text-center text-light">
                                    <h4 className="m-0 h5 font-weight-bold text-light">Employees</h4>
                                    {company.employee}
                                 </p>

                                 <p className="my-4 text-center text-light">
                                    <h4 className="m-0 h5 font-weight-bold text-light">Headquarters</h4>
                                    {company.headquarter}
                                 </p>

                                 <p className="my-4 text-center text-light">
                                    <h4 className="m-0 h5 font-weight-bold text-light">Industry</h4>
                                    {company.industry}
                                 </p>

                                 <p className="my-4 text-center text-light">
                                    <h4 className="m-0 h5 font-weight-bold text-light">Founding</h4>
                                    {company.founding}
                                 </p>

                                 <hr />
                              </div>
                              <NavLink exact to={"/stocks/" + company.ticker} activeClassName="activeClicked">
                                 <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                    More info about the stock
                                    <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              </NavLink>

                              <NavLink exact to={"/news/"} activeClassName="activeClicked">
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


export { Companies, Company_Page };