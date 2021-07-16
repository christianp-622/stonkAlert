import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NBA from './pages/NBA';
// import {Stocks, Stock_Page, Stock_Table} from './pages/Stocks';
import Stocks from './pages/Stocks'
import Stock_Page from './components/Stock_Page'
import News from './pages/News'
import Article_Page from './components/Article_Page'
import Companies from './pages/Companies'
import Company_Page from './components/Company_Page'
import Search from './pages/Search'

function App() {
  return (
    <Router>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About}/>
            <Route path="/companies" component={Companies} exact/>
            <Route path="/companies/:id" component={Company_Page}/>
            <Route path="/stocks" component={Stocks} exact/>
            <Route path="/stocks/:id" component={Stock_Page}/>
            <Route path="/news" component={News} exact/>
            <Route path="/news/:id" component={News}/>
            <Route path="/article/:id" component={Article_Page}/>
            <Route path="/NBAToday" component={NBA} exact/>
            <Route path="/search/:input" component={Search} exact/>
            <Route path="/search" component={Home}/>
          </Switch>
    </Router>
  );
}

export default App;
