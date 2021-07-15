import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import '../stock.css';
import { NavLink, Redirect } from 'react-router-dom';

/*Table components */
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Spinner from 'react-bootstrap/Spinner'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            companies: [],
            stocks: [],
            news: []
        }
    }

    componentDidMount() {
        this.getSearch();
        this.getStocks();
        this.getCompanies();
        this.getNews();
    }

    getSearch() {
        const input = this.props.match.params.input;
        const pointerToThis = this;
        pointerToThis.setState({
            search: input
        });
    }

    getNews() {
        let localURL = "https://stonkalert.me/api/news?limit=15000";
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
                        news: data
                    });
                }
            )
    }

    getStocks() {
        const localURL = "https://stonkalert.me/api/stocks?limit=15000";
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
                        stocks: data
                    });
                }
            )
    }

    getCompanies() {
        const localURL = "https://stonkalert.me/api/companies?limit=15000";
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
                        companies: data
                    });
                }
            )
    }

    render() {
        const optionsStocks = {
            defaultSearch: this.state.search,
            onRowClick: function (row) {
                window.location.href = "/stocks/" + row.ticker;
            }
        };

        const optionsNews = {
            defaultSearch: this.state.search,
            onRowClick: function (row) {
                window.location.href = "/article/" + row.id;
            }
        };

        const optionsCompanies = {
            defaultSearch: this.state.search,
            onRowClick: function (row) {
                window.location.href = "/companies/" + row.stock;
            }
        };

        let stocks = this.state.stocks;
        let companies = this.state.companies;
        let news = this.state.news;

        let stockTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>;
        let companyTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>;
        let articleTable = <div style={{ margin: "10px auto" }}><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>;

        if (typeof stocks != "undefined" && stocks != null && stocks.length != null && stocks.length > 0) {
            stockTable = <BootstrapTable data={stocks} options={optionsStocks} striped hover pagination version="4">
                <TableHeaderColumn ref='ticker' dataField='ticker' isKey dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Ticker</TableHeaderColumn>
                <TableHeaderColumn ref='price' dataField='price' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Stock Price</TableHeaderColumn>
                <TableHeaderColumn ref='marketcap' dataField='marketcap' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Market Cap</TableHeaderColumn>
                <TableHeaderColumn ref='sector' dataField='sector' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Sector</TableHeaderColumn>
                <TableHeaderColumn ref='tradescore' dataField='tradescore' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Trader Score</TableHeaderColumn>
                <TableHeaderColumn ref='investscore' dataField='investscore' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Investor Score</TableHeaderColumn>
            </BootstrapTable>;
        }
        if (typeof companies != "undefined" && companies != null && companies.length != null && companies.length > 0) {
            companyTable = <BootstrapTable data={companies} options={optionsCompanies} striped hover pagination version="4">
                <TableHeaderColumn dataField='name' isKey dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='industry' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Industry</TableHeaderColumn>
                <TableHeaderColumn dataField='country' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Country</TableHeaderColumn>
                <TableHeaderColumn dataField='exchange' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Exchange</TableHeaderColumn>
                <TableHeaderColumn dataField='stock' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Symbol</TableHeaderColumn>
            </BootstrapTable>;
        }
        if (typeof news != "undefined" && news != null && news.length != null && news.length > 0) {
            articleTable = <BootstrapTable data={news} options={optionsNews} striped hover pagination version="4">
                <TableHeaderColumn dataField='headline' isKey dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Title</TableHeaderColumn>
                <TableHeaderColumn dataField='datetime' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='source' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Source</TableHeaderColumn>
                <TableHeaderColumn dataField='ticker' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Symbol</TableHeaderColumn>
                <TableHeaderColumn dataField='company' dataSort={true} thStyle={{ color: 'white' }} tdStyle={{ color: 'white' }}>Company</TableHeaderColumn>
            </BootstrapTable>;
        }

        let input = this.state.search;
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
                                                <h4 className="m-0 h1 font-weight-bold text-light">Stonk Alert Search</h4>
                                            </p>
                                            <hr />
                                            <p className="my-4 text-center text-light">
                                                <h4 className="m-0 h4 font-weight-bold text-light">Stocks with "{input}" term...</h4>
                                            </p>
                                            {stockTable}
                                            <p className="my-4 text-center text-light">
                                                <h4 className="m-0 h4 font-weight-bold text-light">Companies with "{input}" term...</h4>
                                            </p>
                                            {companyTable}
                                            <p className="my-4 text-center text-light">
                                                <h4 className="m-0 h4 font-weight-bold text-light">Articles with "{input}" term...</h4>
                                            </p>
                                            {articleTable}
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

export default Search;