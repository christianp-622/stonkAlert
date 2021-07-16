import React from 'react'
import Plot from 'react-plotly.js';
import {
   PieChart,
   Pie,
   Tooltip,
   BarChart,
   XAxis,
   YAxis,
   Legend,
   CartesianGrid,
   Bar,
   ResponsiveContainer,
   Label,
   Cell
} from 'recharts';
import Spinner from 'react-bootstrap/Spinner'
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const axisColors = "#FFFFFF";
const colors = scaleOrdinal(schemeCategory10).range();


class GamesGraph extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         games: [],
      }
   }

   componentDidMount() {
      this.getGames();
   }

   getGames() {
      const pointerToThis = this;

      let API_Call = `https://nbatoday.xyz/api/games?sort_by=date&sort_order=descending&per_page=45`;

      // fetch(API_Call)
      //     .then(
      //         function (response) {
      //             return response.json();
      //         }
      //     )
      //     .then(
      //         function (data) {
      // list of dicts of players in average scoring range

      fetch(API_Call)
         .then(
            function (response) {
               return response.json();

            }
         )
         .then(
            function (data) {
               let gameList = data['data'];
               let gameData = []

               for (var i = 0; i < gameList.length; i++) {
                  let data = { date: gameList[i]['date'] + ": " + gameList[i]['h_team_name'] + " (Home)" + " vs "  + gameList[i]['v_team_name'] + " (Visiting)", home_team: gameList[i]['h_score'], visiting_team: gameList[i]['v_score'],  h_team: gameList[i]['h_team_name'], v_team: gameList[i]['v_team_name']};
                  gameData.push(data);
                  console.log(data);
               }

               gameData.sort((a, b) => (a.date > b.date) ? 1 : -1);
               pointerToThis.setState({
                  games: gameData
               });
            }


         )
   }

   render() {

      let games = this.state.games;
      let graphs = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof games != "undefined" && games != null && games.length != null && games.length > 0) {
         console.log(games);
         graphs = <div style={{ textAlign: "center" }}>
            <h4 className="m-0 font-weight-bold text-center text-light">Game Results</h4>
            <p className="my-4 text-center text-light">
               Displays the game results for the 45 most recent games from NBAToday.
            </p>
            <p className="my-4 text-center text-light">
               Hover over the graph for more information!
            </p>
            <div>
               <ResponsiveContainer width="100%" height={500}>
                  <BarChart width={1500} height={500} data={games} >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="date"  stroke={axisColors} tick={false} />
                     <YAxis stroke={axisColors} />
                     <Tooltip />
                     <Legend />
                     <Bar dataKey="home_team" fill="#8884d8" name = "Home Team Score"/>
                     <Bar dataKey="visiting_team" fill="#82ca9d" name = "Visiting Team Score"/>

                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      }
      return (
         graphs
      )
   }
}

export default GamesGraph;
