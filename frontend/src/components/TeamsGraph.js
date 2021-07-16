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


class TeamsGraph extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         teams: [],
      }
   }

   componentDidMount() {
      this.getTeams();
   }

   getTeams() {
      const pointerToThis = this;

      let API_Call = `https://nbatoday.xyz/api/teams?per_page=30`;

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
               let teamList = data['data'];
               let teamData = []

               for (var i = 0; i < teamList.length; i++) {


                  let wl_ratio = teamList[i]['wins'] / teamList[i]['losses'];
                  let data = { name: teamList[i]['name'], wl: wl_ratio, color: '#' + teamList[i]['color'] }
                  teamData.push(data);
                  console.log(data);
               }

               teamData.sort((a, b) => (a.wl > b.wl) ? 1 : -1);
               pointerToThis.setState({
                  teams: teamData
               });
            }


         )
   }

   render() {
      let teams = this.state.teams;
      let graphs = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof teams != "undefined" && teams != null && teams.length != null && teams.length > 0) {
         console.log(teams);
         graphs = <div style={{ textAlign: "center" }}>
            <h4 className="m-0 font-weight-bold text-center text-light">Win/Loss Ratio per Team</h4>
            <p className="my-4 text-center text-light">
               Displays the the win/loss ratio per team.
            </p>
            <p className="my-4 text-center text-light">
               Hover over graph for more information!
            </p>
            <div>
               <ResponsiveContainer width="100%" height={500}>
                  <BarChart width={1500} height={500} data={teams} >

                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" stroke={axisColors} tick={false} />
                     <YAxis stroke={axisColors} />
                     <Tooltip />
                     <Bar dataKey="wl" fill="#000000" name="Win/Loss Ratio">
                        {teams.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={colors[index % 5]} />
                        ))}
                     </Bar>
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

export default TeamsGraph;
