import React from 'react';
import Plot from 'react-plotly.js';

class Stock3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockX: [],
            stockY: []
        }
    }

    componentDidMount() {
        this.getStock();
    }

    getStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = '3P8EFXNOM0JN21Q0';
        let stock = 'BB';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=compact&apikey=${API_KEY}`;
        let stockXFunction = [];
        let stockYFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockXFunction.push(key);
                        stockYFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    pointerToThis.setState({
                        stockX: stockXFunction,
                        stockY: stockYFunction
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <Plot
                    data={[
                        {
                            x: this.state.stockX,
                            y: this.state.stockY,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'black' },
                        }
                    ]}
                    config={{ responsive: true }}
                    layout={{
                        width: "1000", height: "440", title: 'BB', plot_bgcolor: "rgba(0,0,0,0)",
                        paper_bgcolor: "rgba(0,0,0,0)", "yaxis": { "gridcolor": "rgba(0,0,0,0)" },
                        "xaxis": { "gridcolor": "rgba(0,0,0,0)" }, font: { color: '#ffffff' }, autosize: true
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        )
    }
}

export default Stock3;