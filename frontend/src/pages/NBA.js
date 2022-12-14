import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import '../App.css';
import PlayerDistributions from '../components/PlayerDistributions';
import TeamsGraph from '../components/TeamsGraph'
import GamesGraph from "../components/GamesGraph"

class NBA extends React.Component {
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
                              <h4 className="m-0 h1 text-center font-weight-bold text-light">NBAToday</h4>
                              <p className="my-4 text-center text-light"> 
                                 The NBAToday API provides many filtering/sorting query parameters and robust features in order to retrieve its many games, players, and teams.
                                 <br/>After making multiple requests, we were able to make interesting observations about the returned attributes of each model.<br/>We decided
                                 to showcase our findings through a series of visuals.
                              </p>
                           </p>
                           <hr/>
                           <h2 className="m-0 font-weight-bold text-center text-light">Players</h2>
                           <hr/>
                           <PlayerDistributions></PlayerDistributions>
                           <hr/>
                           <h2 className="m-0 font-weight-bold text-center text-light">Teams</h2>
                           <hr/>
                           <TeamsGraph></TeamsGraph>
                           <hr/>
                           <h2 className="m-0 font-weight-bold text-center text-light">Games</h2>
                           <hr/>
                           <GamesGraph></GamesGraph>
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
 
 export default NBA;