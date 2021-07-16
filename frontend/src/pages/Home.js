import React from 'react';
import '../App.css';
import Stock from '../components/Stock';
import logo from '../images/stonkalertwebsite.png';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import buildings from '../images/buildings.png';

class Home extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       article1: {},
       article2: {}, // for some reason using a list doesn't work rip
       article3: {},
     }
  }
 
   componentDidMount() {
     this.getInfo();
   }
   
 
   getInfo() {
      const localURLArticle = "https://stonkalert.me/api/news?sort=datetime&limit=3"; // get 3 most recent articles
      // const localURLArticle = "http://127.0.0.1:5000/api/news?sort=datetime&limit=3"; // get 3 most recent articles
      // const localURLArticle = window.location.protocol + "//" + window.location.hostname + "/api/news?sort=datetime&limit=3";
      const pointerToThis = this;

      fetch(localURLArticle)
        .then(
          function (response) {
            return response.json();
          }
        )
        .then(
          function (data) {
            console.log(data);
            pointerToThis.setState({
               article1: data[0],
               article2: data[1],
               article3: data[2]
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
                     <div className="cards-container">

                        <div className="card-bg w-100 border d-flex flex-column">
                           <div className="p-4 d-flex flex-column h-100">
                              <div className="d-flex align-items-center justify-content-between">
                                 <h4 className="m-0 h5 font-weight-bold text-light">What is Stonk Alert?</h4>
                                 <div className="py-1 px-2 bg-white rounded-circle"><i className="fas fa-users"></i></div>
                              </div>
                              <img src={logo} alt="logo"/>
                              <p className="my-4 text-center text-light">Welcome to Stonk Alert! Stonk Alert tracks news, trends, provides information, and more on stocks and their companies.</p>
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
                           <div style={{ margin: "10px auto" }}>
                              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                 <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                 </div>
                                 <div class="carousel-inner">
                                    <div class="carousel-item active">
                                       <Stock ticker="GME"/>
                                    </div>
                                    <div class="carousel-item">
                                       <Stock ticker="AMC"/>
                                    </div>
                                    <div class="carousel-item">
                                       <Stock ticker="BB"/>
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
                                 <img src={buildings} alt="buildings"/>
                              
                              <div className="p-0 mt-auto">
                              <p className="my-4 text-center text-light">Check out more information on these stock's companies!</p>
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
                                 <h4 className="m-0 h5 font-weight-bold text-light">Recent News</h4>
                                 <div className="px-2 py-1 bg-white rounded-circle"><i className="fas fa-newspaper"></i></div>
                              </div>
                              <div className="mt-auto d-flex align-items-center justify-content-between">
                                 <div>
                                    <ul>
                                    <li style={{color:"white"}}><a className="my-4 h4 font-weight-bold text-light" href={"article/" + this.state.article1.id}><h4 className="my-4 text-left text-light"><strong>{this.state.article1.headline} </strong></h4></a></li>
                                    <li style={{color:"white"}}><a className="my-4 h4 font-weight-bold text-light" href={"article/" + this.state.article2.id}><h4 className="my-4 text-left text-light"><strong>{this.state.article2.headline} </strong></h4></a></li>
                                    <li style={{color:"white"}}><a className="my-4 h4 font-weight-bold text-light" href={"article/" + this.state.article3.id}><h4 className="my-4 text-left text-light"><strong>{this.state.article3.headline} </strong></h4></a></li>
                                    </ul>
                                 </div>

                              </div>
                              <div className="p-0">
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
   )
}
}
export default Home;