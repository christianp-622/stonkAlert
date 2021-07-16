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
import Card from 'react-bootstrap/Card';
import { Container, ListGroup, ListGroupItem, CardDeck } from "react-bootstrap";

const axisColors = "#FFFFFF";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#800080", "#FF0000"];

class PlayerDistributions extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         distributions: [],
         topThree: [],
         total: 0
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
               // gets number of players in each scoring range
               let top = [];
               let dist = [{ name: "0 to 5 points", players: 0 }, { name: "5 to 10 points", players: 0 }, { name: "10 to 15 points", players: 0 }, { name: "15 to 20 points", players: 0 }, { name: "20 to 25 points", players: 0 }, { name: "25 to 30 points", players: 0 }];
               let i = 0;
               for (; i < data['data'].length; i++) {
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
                     let player = { name: data['data'][i]['name'], points: data['data'][i]['average_points_per_game'], headshot: data['data'][i]['headshot_embed_link'] }
                     top.push(player);
                  }
               }
               pointerToThis.setState({
                  distributions: dist,
                  topThree: top,
                  total: i
               });
            }
         )
   }

   render() {
      let dists = this.state.distributions;
      let top = this.state.topThree;
      let graphs = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
      </Spinner>
      </div>;
      if (typeof dists != "undefined" && dists != null && dists.length != null && dists.length > 0) {
         console.log(dists);
         graphs = <div style={{ textAlign: "center" }}>
            <h4 className="m-0 font-weight-bold text-center text-light"> Top Three Scoring Players</h4>
            <div style={{ margin: "10px auto" }}>
               <CardDeck className="deck">
                  <Card classname="card" text="white">
                     <Card.Img className="img" variant="top" src={top[2]['headshot']} />
                     <Card.Body>
                        <Card.Title>{top[2]['name']}</Card.Title>
                        <ListGroup className="list-group-flush">
                           <ListGroupItem>Average Points Per Game: {top[2]['points']}</ListGroupItem>
                        </ListGroup>
                     </Card.Body>
                  </Card>
                  <Card classname="card" text="white">
                     <Card.Img className="img" variant="top" src={top[1]['headshot']} />
                     <Card.Body>
                        <Card.Title>{top[1]['name']}</Card.Title>
                        <ListGroup className="list-group-flush">
                           <ListGroupItem>Average Points Per Game: {top[1]['points']}</ListGroupItem>
                        </ListGroup>
                     </Card.Body>
                  </Card>
                  <Card classname="card" text="white">
                     <Card.Img className="img" variant="top" src={top[0]['headshot']} />
                     <Card.Body>
                        <Card.Title>{top[0]['name']}</Card.Title>
                        <ListGroup className="list-group-flush">
                           <ListGroupItem>Average Points Per Game: {top[0]['points']}</ListGroupItem>
                        </ListGroup>
                     </Card.Body>
                  </Card>
               </CardDeck>
            </div>
            <h4 className="m-0 font-weight-bold text-center text-light">Average Scoring Ranges of All {this.state.total} Players</h4>
            <p className="my-4 text-center text-light">
               Displays the distribution of the number of players in each average scoring range per game (from 0 to 30 pts).
            </p>
            <p className="my-4 text-center text-light">
               Hover over the graphs for more information!
            </p>
            <div>
               <ResponsiveContainer width="100%" height={400}>
                  <PieChart width={400} height={400}>
                     <Pie
                        dataKey="players"
                        isAnimationActive={true}
                        data={dists}
                        cx="50%"
                        cy="50%"
                        outerRadius={175}
                        fill="#8884d8"
                        label
                     >
                        {dists.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}</Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>

               <ResponsiveContainer width="100%" height={400}>
                  <BarChart width={1500} height={500} data={dists} >

                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" stroke={axisColors} tick={false} />
                     <YAxis stroke={axisColors} />
                     <Tooltip />
                     <Bar dataKey="players" fill="#000000" name="Players in this Scoring Range">
                        {dists.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default PlayerDistributions;
