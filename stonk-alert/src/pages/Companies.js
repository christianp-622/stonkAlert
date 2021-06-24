import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar';
import logo from '../images/gme2_transparent.png';
import logo2 from '../images/bb-transparent.png';
import logo3 from '../images/amc_logo.png';
import { NavLink } from 'react-router-dom';
 
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

                     <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                           <div className="d-flex align-items-center justify-content-between">
                           
                              
                           </div>
                           <img src={logo} />
                           <hr/>
                           <p className="my-4 text-center text-light"> <h4 className="m-0 h5 font-weight-bold text-light">About</h4>  GameStop Corp. engages in the retail of multichannel videogame, consumer 
                              txt  electronics, and wireless services. It operates through the following segments: 
                              United States, Canada, Australia, and Europe. The United States segment includes 
                              the retail operations and electronic commerce websites wwww.gamestop.com and 
                              www.thinkgeek.com, Game Informer magazine, and Kongregate. The Canada segment
                              comprises of retail and e-commerce business. The Austrailia segment refers to the 
                              retail and e-commerce operation in Austrailia and New Zealand. The Europe segment pertains 
                              to the retail and e-commerce operations in the European countries. The company was founded
                              by Daniel A. DeMatteo. 
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Employees</h4> 
                              12,000
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Headquarters</h4> 
                              Grapevine, Texas
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Industry</h4> 
                              Retail
                           </p>

                           <p className="my-4 text-center text-light">
                           <h4 className="m-0 h5 font-weight-bold text-light">Founding</h4> 
                              1996
                           </p>

                           <hr/>

                           <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                              <a className="text-light" href="https://www.gamestop.com/">Visit Gamestop Website</a>
                              <i className="fas fa-arrow-right ml-1"></i>
                           </p>

                           <NavLink exact to="/stocks/GME" activeClassName="activeClicked">
                              <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 Gamestop Stock
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

                     <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                           <div className="d-flex align-items-center justify-content-between">
                             
                              
                           </div>
                           <img src={logo2} />
                           <hr/>
                           <p className="my-4 text-center text-light"> <h4 className="m-0 h5 font-weight-bold text-light">About</h4>  BlackBerry Ltd. engages in the provision of security software and services to enterprises and 
                           governments. It offers cybersecurity consulting enterprise consulting, endpoint management, and unified 
                           endpoint security. The company was founded by Michael Lazaridis, James Laurence Balsillie, and Douglas E.

                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Employees</h4> 
                              3,497
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Headquarters</h4> 
                              Waterloo, Ontario
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Industry</h4> 
                              Software
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Founding</h4> 
                              March 7, 1984
                           </p>

                           <hr/>

                           <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                              <a className="text-light" href="https://www.blackberry.com/">Visit BlackBerry Website</a>
                              <i className="fas fa-arrow-right ml-1"></i>
                           </p>

                           <NavLink exact to="/stocks/BB" activeClassName="activeClicked">
                              <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 BlackBerry Stock
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

                     <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                           <div className="d-flex align-items-center justify-content-between">
                              
                           </div>
                           <img src={logo3} />
                           <hr/>
                           <p className="my-4 text-center text-light"> <h4 className="m-0 h5 font-weight-bold text-light">About</h4>  AMC Entertainment Holdings, Inc. engages in the theatrical exhibition business through
                           its subsidiaries. It operates through the United States Markets and International Markets segments. 
                           The United States segment involves in the activity in the U.S. specifically in New York, Los Angeles, 
                           Chicaco, Atlanta, and Washington, D.C. The International Markets segment focuses its operations in the 
                           United Kingdom, Germany, Spain, Italy, Ireland, Portugal, Sweden, Finland, Estonia, Lativa, Lithuania,
                           Norway, and Denmark. The company was founded by Barney Dubinsky, Maurice Durwood and Edward Durwood. 

                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Employees</h4> 
                              28,468
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Headquarters</h4> 
                              Leawood, Kansas
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Industry</h4> 
                              Entertainment
                           </p>

                           <p className="my-4 text-center text-light">
                              <h4 className="m-0 h5 font-weight-bold text-light">Founding</h4> 
                              1920
                           </p>

                           <hr/>
                           <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 <a className="text-light" href="https://www.amctheatres.com/">Visit AMC Website</a>
                                 <i className="fas fa-arrow-right ml-1"></i>
                              </p>
                           

                           <NavLink exact to="/stocks/AMC" activeClassName="activeClicked">
                              <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 AMC Stock
                                 <i className="fas fa-arrow-right ml-1"></i>
                              </p>
                           </NavLink>

                           <NavLink exact to="/news" activeClassName="activeClicked">
                              <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                 Realted News 
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
 
export default Companies;