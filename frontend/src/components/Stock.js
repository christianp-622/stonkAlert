import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockX: [],
      stockY: [],
    }
    this.getStock = this.getStock.bind(this);
  }

  componentDidMount() {
    this.getStock();
  }

  getStock() {
    const pointerToThis = this;

    //get rid of key sometime from code
    let stock = this.props.ticker;
    //http://www.styvio.com/api/${stock}
    let API_Call  = `https://arcane-springs-49957.herokuapp.com/http://www.styvio.com/api/${stock}`;
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
          console.log("data");
          console.log(data);
          let yearlyPrices = data['yearlyPrices'];
          let i =0;
          for (; i< yearlyPrices.length;i++) {
            if (yearlyPrices.length - 1 - i == 0) // if statements to put how many days ago since styvio doesn't provide dates
              stockXFunction.push("Today");
            else if (yearlyPrices.length - 1 - i == 1)
              stockXFunction.push("1 Day Ago");
            else
              stockXFunction.push((yearlyPrices.length - 1 - i) + " Days Ago");
            stockYFunction.push(yearlyPrices[i]); 
          }

          pointerToThis.setState({
            stockX: stockXFunction,
            stockY: stockYFunction
          });
        }
      )
  }

  render() {
    // assign random color to graph lines
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let randomColor = "rgb(" + r + "," + g + "," + b + ")"
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockX,
              y: this.state.stockY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: randomColor },
            }
          ]}
          config={{ responsive: true }}
          layout={{
            width: "1000", height: "440", title: this.props.ticker, plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",  "yaxis": {"title":'$USD', "gridcolor": "rgba(0,0,0,0)"},
            "xaxis": { "title":'Days Ago', "gridcolor": "rgba(0,0,0,0)", "tickvals": [ "250 Days Ago", "200 Days Ago", "150 Days Ago", "100 Days Ago", "50 Days Ago", "Today", ]}, font: { color: '#ffffff' }, autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    )
  }
}

export default Stock;