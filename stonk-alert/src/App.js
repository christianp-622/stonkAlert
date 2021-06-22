import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Stocks from './pages/Stocks';
import News from './pages/News';
import Companies from './pages/Companies';

function App() {
  return (
    <Router>
      <body>
      <div className="App">
        <div class="column">
          <Sidebar />
        </div>
        <div class="column">
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About}/>
            <Route path="/companies" component={Companies}/>
            <Route path="/stocks" component={Stocks}/>
            <Route path="/news" component={News}/>
          </Switch>
        </div>
        
      </div>
      </body>
    </Router>
  );
}

export default App;
