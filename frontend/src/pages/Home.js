import React from 'react';
import '../App.css';
import Stock from '../components/Stock';
import Stock2 from '../components/Stock2';
import Stock3 from '../components/Stock3';
import logo from '../images/stonkalertwebsite.png';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';

const Home = () => {
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
                                 <h4 className="m-0 h5 font-weight-bold text-light">What is Stonk Alert?</h4>
                                 <div className="py-1 px-2 bg-white rounded-circle"><i className="fas fa-users"></i></div>
                              </div>
                              <img src={logo} alt="logo"/>
                              <p className="my-4 text-center text-light">Welcome to Stonk Alert! Stonk Alert tracks news, trends, provides information, and more on "meme stocks" and their companies.</p>
                              <NavLink exact to="/about" activeClassName="activeClicked">
                                 <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                    More About Us
                                    <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              </NavLink>
                           </div>
                        </div>

                        <div className="card-bg w-100 border d-flex flex-column p-4 wide border d-flex flex-column" style={{ gridRow: "span 2" }}>
                           <div className="d-flex">
                              <h6 className="h5 font-weight-bold text-light">Top Meme Stocks</h6>
                              <div className="ml-auto rounded-circle bg-white py-1 px-2"><i className="fas fa-chart-line"></i></div>
                           </div>
                           <div className="d-flex mt-4">

                              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                 <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                 </div>
                                 <div class="carousel-inner">
                                    <div class="carousel-item active">
                                       <Stock />
                                    </div>
                                    <div class="carousel-item">
                                       <Stock2 />
                                    </div>
                                    <div class="carousel-item">
                                       <Stock3 />
                                    </div>
                                 </div>
                                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                 </button>
                                 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                 </button>
                              </div>

                              <div>

                              </div>

                           </div>
                           <NavLink exact to="/stocks" activeClassName="activeClicked">
                              <p className="c-p text-light mb-0 font-weight-bold text-right mt-auto">

                                 See More
                                 <i className="fas fa-arrow-right ml-1"></i>
                              </p>
                           </NavLink>
                        </div>

                        <div className="card-bg-white w-100 border d-flex flex-column">
                           <div className="p-4 d-flex flex-column h-100">
                              <div className="d-flex align-items-center justify-content-between">
                                 <h4 className="m-0 h5 font-weight-bold">r/wallstreetbets</h4>
                                 <div className="px-2 py-1 bg-white rounded-circle"><i className="fas fa-comment-dollar"></i></div>
                              </div>
                              <div className="mt-3 d-flex justify-content-between">
                                 <div className="text-right w-25">

                                 </div>
                              </div>
                              
                                 <p className="c-p mb-0 font-weight-bold text-right mt-auto">
                                    <a href="https://www.reddit.com/r/wallstreetbets/">View Subreddit</a>
                                    <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              
                           </div>
                        </div>





                        <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{ gridRow: "span 2" }}>
                           <div className="p-4 d-flex flex-column h-100">
                              <div className="d-flex align-items-center justify-content-between">
                                 <h4 className="m-0 h5 font-weight-bold text-light">Companies</h4>
                                 <div className="px-2 py-1 bg-white rounded-circle"><i className="fas fa-building"></i></div>
                              </div>
                              <div className="mt-5 d-flex align-items-center text-center justify-content-between">
                                 <div>
                                    <h4 className="m-0 h1 font-weight-bold text-light text-center">GameStop AMC BlackBerry</h4>
                                    <h4 className="text-success text-center"><i className="fas fa-arrow-up"></i> 21%</h4>

                                 </div>
                                 <div className="text-right d-flex flex-column justify-content-between">
                                    <div className="d-flex align-items-center justify-content-between text-primary">

                                    </div>
                                    <div className="d-flex align-items-center justify-content-between text-warning">

                                    </div>
                                 </div>
                              </div>
                              <div className="p-0 mt-auto">
                              </div>
                              <NavLink exact to="/companies" activeClassName="activeClicked">
                                 <p className="c-p text-light font-weight-bold text-right mt-3 mb-0">
                                    More About Them
                                    <i className="fas fa-arrow-right ml-1"></i>
                                 </p>
                              </NavLink>
                           </div>
                        </div>


                        <div className="card-bg w-100 border d-flex flex-column wide border d-flex flex-column" style={{ gridRow: "span 2" }}>
                           <div className="p-4 d-flex flex-column h-100">
                              <div className="d-flex align-items-center justify-content-between">
                                 <h4 className="m-0 h5 font-weight-bold text-light">Related News</h4>
                                 <div className="px-2 py-1 bg-white rounded-circle"><i className="fas fa-newspaper"></i></div>
                              </div>
                              <div className="mt-5 d-flex align-items-center justify-content-between">
                                 <div>
                                 <h4 className="my-4 text-left text-light"><strong>&emsp; GameStop stock jumps after the original meme stock cashes in again with $1 billion share sale... </strong></h4>

                                 </div>
                                 <div className="text-right d-flex flex-column justify-content-between">
                                    <div className="d-flex align-items-center justify-content-between text-primary">

                                    </div>
                                    <div className="d-flex align-items-center justify-content-between text-warning">

                                    </div>
                                 </div>
                              </div>
                              <div className="p-0 mt-auto">
                              </div>
                              <NavLink exact to="/news" activeClassName="activeClicked">
                                 <p className="c-p text-light font-weight-bold text-right mt-3 mb-0">
                                    See More
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

export default Home;