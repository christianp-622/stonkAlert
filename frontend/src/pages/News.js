import React from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import { NavLink } from 'react-router-dom';
import '../News.css';
import NewsCard from '../components/NewsCard'
//get the data from the json
const data = require("../tempNewsData.json");
const news = data['news']


const News = () => {
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
                              {news.map((article) => (
                                 <NewsCard article={article} />
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* component for individual news pages */
const News_Page = () => {
    let {id} = useParams();
    let newsSingle = {};
    /* Search for the news in the json */
    for (const news of data.news) {

        if (news.id === id) {
            newsSingle = news;
            break;
        }

    }

    return (
        <div className="home d-flex">
            <div>
                <Sidebar />
            </div>
            <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
                <div style={{ height: "100%" }}>
                    <div style={{ height: "calc(100%)", overflowY: "scroll" }}>
                        <div className="d-flex card-section">
                            <div className="news-container">

                                <div className="card-bg w-100 border d-flex flex-column">
                                    <div className="p-4 d-flex flex-column h-100">
                                        <NavLink exact to="/news/" activeClassName="activeClicked">
                                            <p className="c-p mt-0 text-light font-weight-bold text-left mb-auto">

                                                <i className="fas fa-arrow-left mr-1"></i>
                                                View Other News
                                            </p>
                                        </NavLink>
                                        <div className="align-items-center justify-content-between">
                                            <h1 class="text-light">{newsSingle.title}</h1>
                                        </div>

                                        <div class="news-info">
                                            <p className="my-4 text-left text-light">

                                                <strong>Company: </strong>{newsSingle.company}
                                                <br></br>
                                                <strong>Stock: </strong>{newsSingle.stock}
                                                <br></br>
                                                <strong>Date: </strong> {newsSingle.date}
                                                <br></br>
                                                <strong>Source: </strong> {newsSingle.source}
                                                <br></br>
                                                <strong>Description: </strong>{newsSingle.description}
                                                <br></br>
                                                <strong>Link: </strong>{newsSingle.link}
                                                <br></br>


                                            </p>

                                        </div>



                                        <NavLink exact to={"/companies/" + newsSingle.stock} activeClassName="activeClicked">
                                            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                More info about the company
                                                <i className="fas fa-arrow-right ml-1"></i>
                                            </p>
                                        </NavLink>

                                        <NavLink exact to={"/stocks/" + newsSingle.stock} activeClassName="activeClicked">
                                            <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                                                More info about the stock
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
    );
}

export { News, News_Page };