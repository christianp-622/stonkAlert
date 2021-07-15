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
} from 'recharts';
import Spinner from 'react-bootstrap/Spinner'

class PlayerDistributions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distributions: [],
        }
        this.getScores = this.getScores.bind(this);
    }

    componentDidMount() {
        this.getScores();
    }

    getScores() {
        const pointerToThis = this;

        let API_Call = `https://nbatoday.xyz/api/players?page=1&per_page=550`;

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    // list of dicts of players in average scoring range
                    dist = [{ range: "0 to 5 points", players: 0 }, { range: "5 to 10 points", players: 0 }, { range: "10 to 15 points", players: 0 }, { range: "15 to 20 points", players: 0 }, { range: "20 to 25 points", players: 0 }, { range: "25 to 30 points", players: 0 }];

                    // gets number of players in each scoring range
                    let i = 0;
                    for (; i < data.length; i++) {
                        if (data[i]['average_points_per_game'] < 5) {
                            dist[0]['players']++;
                        }

                        else if (data[i]['average_points_per_game'] < 10) {
                            dist[1]['players']++;
                        }

                        else if (data[i]['average_points_per_game'] < 15) {
                            dist[2]['players']++;
                        }

                        else if (data[i]['average_points_per_game'] < 20) {
                            dist[3]['players']++;
                        }

                        else if (data[i]['average_points_per_game'] < 25) {
                            dist[4]['players']++;
                        }

                        else {
                            dist[5]['players']++;
                        }

                    }

                    pointerToThis.setState({
                        distributions: dist
                    });
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
            graphs = <div style={{ textAlign: "center" }}>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="players"
                            isAnimationActive={false}
                            data={this.state.distributions}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                    <BarChart
                        width={500}
                        height={300}
                        data={this.state.distributions}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 80,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis
                            dataKey="range"
                            scale="point"
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="players" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </div>
            </div>
        }
        return (
            {graphs}
        )
    }
}

export default PlayerDistributions;