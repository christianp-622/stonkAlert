import React, {useState} from 'react';
import Sidebar from './Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';
import StockCard from './StockCard'

/*Table components */
import {BootstrapTable,TableHeaderColumn} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";


class Article_Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        article: {}
      }
   }
  
    componentDidMount() {
      this.getArticle();
    }
    
  
    getArticle() {
       const id = this.props.match.params.id;
      //  const localURL = "http://stonkalert.me/api/article?id=" + id;
       const localURL = "http://127.0.0.1:5000/api/article?id=" + id;
       const pointerToThis = this;
 
       fetch(localURL)
         .then(
           function (response) {
             return response.json();
           }
         )
         .then(
           function (data) {
             console.log(data);
             pointerToThis.setState({
                article: data
              });
           }
         )
    }
    

    render() {
        let article = this.state.article;

        /* */
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
                                 <NavLink exact to="/news/" activeClassName="activeClicked">
                                    <p className="c-p mt-0 text-light font-weight-bold text-left mb-auto">
                                       <i className="fas fa-arrow-left mr-1"></i>
                                       View Other News
                                    </p>
                                 </NavLink>
                                 <div className="align-items-center justify-content-between" align="center">
                                    {<img src={article.image} className="img-fluid image-wrapper" width="400px"/>}
                                    <p className="my-4 text-center text-light"> 
                                       <h4 className="m-0 h5 font-weight-bold text-light">{article.headline}</h4>
                                    </p>
                                    <hr />

                                    <p className="my-4 text-center text-light"> 
                                       <h4 className="m-0 h5 font-weight-bold text-light">Source</h4>
                                       {article.source}
                                    </p>

                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Date</h4>
                                       {article.datetime}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Summary</h4>
                                       {article.summary}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Company</h4>
                                       {article.company}
                                    </p>

                                    <p className="my-4 text-center text-light">
                                       <h4 className="m-0 h5 font-weight-bold text-light">Stock</h4>
                                       {article.ticker}
                                    </p>
   
                                    <p className="my-4 text-center text-light">
                                       <a className="m-0 h5 font-weight-bold text-light" href={article.link}>Visit Link</a>
                                       <i className="fas fa-arrow-right ml-1"></i>
                                    </p>
                                    <hr />
                                 </div>
                                 <NavLink exact to={"/companies/" + article.ticker} activeClassName="activeClicked">
                                            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                More about the company
                                                <i className="fas fa-arrow-right ml-1"></i>
                                            </p>
                                        </NavLink>

                                        <NavLink exact to={"/stocks/" + article.ticker} activeClassName="activeClicked">
                                            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                More about this stock
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
  
  export default Article_Page;