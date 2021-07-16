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
import Mark from 'mark.js'

function getCaret(direction) {
    if (direction === 'asc') {
        return (
            <span>      <i className="fas fa-arrow-up"></i></span>
        );
    }
    if (direction === 'desc') {
        return (
            <span>      <i className="fas fa-arrow-down"></i></span>
        );
    }
    return (
        <span>      <i className="fas fa-arrow-up"></i><i className="fas fa-arrow-down"></i></span>
    );
}

/* used to compare two scores */
const stockScore = {
    'A+': 0,
    'A': 1,
    'A-': 2,
    'B+': 3,
    'B': 4,
    'B-': 5,
    'C': 6,

}

function sortByScore(a, b, order, field) {
    console.log(field);
    let A = stockScore[a[field]];
    let B = stockScore[b[field]];
    if (order == 'desc') {
        return A - B
    } else {
        return B - A
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            companies: [],
            stocks: [],
            news: []
        }
        this.results = React.createRef();
    }

    componentDidMount() {
        this.getStocks();
        this.getCompanies();
        this.getNews();
        this.interval = setInterval(() => this.doSearch(this.state.search), 1000);
        let callback = (mutationsList, observer) => {
            //this.doSearch(this.state.search);
            mutationsList.forEach((mutation) => {
                console.log("---------");
                console.log(mutation.target);
                switch (mutation.type) {
                    case 'childList':
                        this.doSearch(this.state.search);
                        //mutation.target.style.backgroundColor = 'red';
                        break;
                    case 'attributes':
                        this.doSearch(this.state.search);
                        break;
                }
            });
        };
        let observer = new MutationObserver(callback);
        observer.observe(this.results.current, { characterData: true, attributes: true, childList: true, subtree: false });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    doSearch(text) {
        console.log(text);
        //var instance = new Mark(document.querySelectorAll("td"));
        var instance = new Mark(document.querySelectorAll("tbody"));
        instance.unmark(text); // clears old text edge case
        console.log(instance);
        instance.mark(text);
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
                        news: data,
                        search: pointerToThis.props.match.params.input
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
                        stocks: data,
                        search: pointerToThis.props.match.params.input
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
                        companies: data,
                        search: pointerToThis.props.match.params.input
                    });
                }
            )
    }

    renderTotal(start, to, total) {
        return (
            <p style={{ color: 'white' }}>
                Showing rows {start} to {to} of {total} instances
            </p>
        );
    }

    onSearchChange = (searchText, colInfos, multiColumnSearch) => {
        this.doSearch(searchText);
    }

    afterSearch = (searchText, result) => {
        this.doSearch(searchText);
    }

    onSortChange = (sortName, sortOrder) => {
        if (this.state.search && this.state.search != "") {
            console.log(this.state.search);
            this.doSearch(this.state.search);
        }
    }

    onPageChange = (page, sizePerPage) => {
        if (this.state.search && this.state.search != "") {
            console.log(this.state.search);
            this.doSearch(this.state.search);
        }
    }

    render() {
        const optionsStocks = {
            onSearchChange: this.onSearchChange,
            afterSearch: this.afterSearch,
            onSortChange: this.onSortChange,
            onPageChange: this.onPageChange,
            paginationShowsTotal: this.renderTotal,
            defaultSearch: this.state.search,
            onRowClick: function (row) {
                window.location.href = "/stocks/" + row.ticker;
            }
        };

        const optionsNews = {
            onSearchChange: this.onSearchChange,
            afterSearch: this.afterSearch,
            onSortChange: this.onSortChange,
            onPageChange: this.onPageChange,
            paginationShowsTotal: this.renderTotal,
            defaultSearch: this.state.search,
            onRowClick: function (row) {
                window.location.href = "/article/" + row.id;
            }
        };

        const optionsCompanies = {
            onSearchChange: this.onSearchChange,
            afterSearch: this.afterSearch,
            onSortChange: this.onSortChange,
            onPageChange: this.onPageChange,
            paginationShowsTotal: this.renderTotal,
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

        let input = this.state.search;

        if (typeof stocks != "undefined" && stocks != null && stocks.length != null && stocks.length > 0) {
            stockTable = <BootstrapTable data={stocks} options={optionsStocks} striped hover pagination version="4" multiColumnSearch>
                <TableHeaderColumn caretRender={getCaret} ref='ticker' dataField='ticker' isKey dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Ticker</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} ref='price' dataField='price' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Stock Price</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} ref='marketcap' dataField='marketcap' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Market Cap</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} ref='sector' dataField='sector' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Sector</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} ref='tradescore' dataField='tradescore' dataSort={true} sortFunc={sortByScore} formatExtraData={stockScore} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Trader Score</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} ref='investscore' dataField='investscore' dataSort={true} sortFunc={sortByScore} formatExtraData={stockScore} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Investor Score</TableHeaderColumn>
            </BootstrapTable>;
        }
        if (typeof companies != "undefined" && companies != null && companies.length != null && companies.length > 0) {
            companyTable = <BootstrapTable data={companies} options={optionsCompanies} striped hover pagination version="4" multiColumnSearch>
                <TableHeaderColumn caretRender={getCaret} dataField='name' isKey dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Name</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='industry' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Industry</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='country' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Country</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='exchange' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Exchange</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='stock' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Symbol</TableHeaderColumn>
            </BootstrapTable>;
        }
        if (typeof news != "undefined" && news != null && news.length != null && news.length > 0) {
            articleTable = <BootstrapTable data={news} options={optionsNews} striped hover pagination version="4" multiColumnSearch>
                <TableHeaderColumn caretRender={getCaret} dataField='headline' isKey dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Title</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='datetime' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Date</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='source' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Source</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='ticker' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Symbol</TableHeaderColumn>
                <TableHeaderColumn caretRender={getCaret} dataField='company' dataSort={true} thStyle={{ color: 'white', whiteSpace: 'normal' }} tdStyle={{ color: 'white', whiteSpace: 'normal' }}>Company</TableHeaderColumn>
            </BootstrapTable>;
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
                                <div className="stock-container">
                                    <div className="card-bg w-100 border d-flex flex-column">
                                        <div className="p-4 d-flex flex-column h-100" ref={this.results}>
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