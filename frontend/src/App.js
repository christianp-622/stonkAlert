import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import {Stocks, Stock_Page, Stock_Table} from './pages/Stocks';
import {News, News_Page} from './pages/News';
import {Companies, GME_Page, AMC_Page, BlackBerry_Page} from './pages/Companies';

function App() {
  return (
    <Router>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About}/>
            <Route path="/companies" component={Companies} exact/>
            <Route path="/companies/GME" component={GME_Page}/>
            <Route path="/companies/AMC" component={AMC_Page}/>
            <Route path="/companies/BB" component={BlackBerry_Page}/>
            <Route path="/stocks" component={Stocks} exact/>
            <Route path="/stocks/:id" component={Stock_Page}/>  brb remove after experiment with table
            <Route path="/news" component={News} exact/>
            <Route path="/news/:id" component={News_Page}/>
          </Switch>
    </Router>
  );
}

export default App;
