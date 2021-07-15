import React from 'react';
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
   Cell
} from 'recharts';
import Spinner from 'react-bootstrap/Spinner'
// import playerData from '../players.json'

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#800080", "#FF0000"];

class PlayerDistributions extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         distributions: [],
      }
   }

   componentDidMount() {
      this.getScores();
   }

   getScores() {
      const pointerToThis = this;

      let API_Call = `https://nbatoday.xyz/api/players?page=1&per_page=550`;

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
               console.log(data);
               // gets number of players in each scoring range
               let dist = [{ name: "0 to 5 points", players: 0 }, { name: "5 to 10 points", players: 0 }, { name: "10 to 15 points", players: 0 }, { name: "15 to 20 points", players: 0 }, { name: "20 to 25 points", players: 0 }, { name: "25 to 30 points", players: 0 }];
               let i = 0;
               for (; i < data['data'].length; i++) {
                  console.log(i);
                  if (data['data'][i]['average_points_per_game'] < 5) {
                     dist[0]['players']++;
                  }

                  else if (data['data'][i]['average_points_per_game'] < 10) {
                     dist[1]['players']++;
                  }

                  else if (data['data'][i]['average_points_per_game'] < 15) {
                     dist[2]['players']++;
                  }

                  else if (data['data'][i]['average_points_per_game'] < 20) {
                     dist[3]['players']++;
                  }

                  else if (data['data'][i]['average_points_per_game'] < 25) {
                     dist[4]['players']++;
                  }

                  else {
                     dist[5]['players']++;
                  }
               }
               pointerToThis.setState({
                  distributions: dist
               });
               // }
               // )
            }
         )
   }

   render() {
      let dists = this.state.distributions;
      let graphs = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof dists != "undefined" && dists != null && dists.length != null && dists.length > 0) {
         console.log(dists);
         graphs = <div style={{ textAlign: "center" }}>
            <div>
               <PieChart width={400} height={400}>
                  <Pie
                     dataKey="players"
                     isAnimationActive={false}
                     data={dists}
                     cx={200}
                     cy={200}
                     outerRadius={80}
                     fill="#8884d8"
                     label
                  >
                  {dists.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}</Pie>
                  <Tooltip />
               </PieChart>
               <BarChart
                  width={500}
                  height={300}
                  data={dists}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 80,
                     bottom: 5,
                  }}
                  barSize={20}
               >
                  <XAxis
                     dataKey="name"
                     scale="point"
                     padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="players" fill="#8884d8" background={{ fill: "#eee" }}>                        
                     {dists.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                  </Bar>
               </BarChart>
            </div>
         </div>
      }
      return (
         graphs
      )
   }
}

export default PlayerDistributions;
