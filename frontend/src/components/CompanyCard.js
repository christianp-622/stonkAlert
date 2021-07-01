import React from 'react';
import { NavLink } from 'react-router-dom';

const CompanyCard = ({company}) => {
    return (
      <div className="card-bg w-100 border d-flex flex-column">
      <div className="p-4 d-flex flex-column h-100">
         <div className="d-flex align-items-center justify-content-between">
         </div>
         <hr />
         <p className="my-4 text-center text-light"> 
            <h4 className="m-0 h5 font-weight-bold text-light">About</h4>  
            {company.about}
         </p>

         <p className="my-4 text-center text-light">
            <h4 className="m-0 h5 font-weight-bold text-light">Employees</h4>
            {company.employees}
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

         <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
            <a className="text-light" href="https://www.amctheatres.com/">Visit AMC Website</a>
            <i className="fas fa-arrow-right ml-1"></i>
         </p>

         <NavLink exact to="/companies/AMC" activeClassName="activeClicked">
            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
               More information on AMC
               <i className="fas fa-arrow-right ml-1"></i>
            </p>
         </NavLink>


         <NavLink exact to="/stocks/AMC" activeClassName="activeClicked">
            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
               AMC Stock
               <i className="fas fa-arrow-right ml-1"></i>
            </p>
         </NavLink>

         <NavLink exact to="/news" activeClassName="activeClicked">
            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
               Related News
               <i className="fas fa-arrow-right ml-1"></i>
            </p>
         </NavLink>
      </div>
   </div>


    );
};

export default CompanyCard;
