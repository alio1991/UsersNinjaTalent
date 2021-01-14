import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LandingView } from './views/LandingView/LandingView.jsx';
import { ErrorPage } from './views/ErrorPage/ErrorPage.jsx';

function App() {

  return (
    <div className="App">
          <HashRouter>
            <Switch>
              <Route exact path="/" render={() => <LandingView/>}/> 
              <Route path="/" render={() => <ErrorPage/>}/>
              {/* <PrivateRoute component={Periods} path="/configuration/periods" sectionName="configurationHolidayPeriod" /> */}
            </Switch>
          </HashRouter>
    </div>
  );
}

export default App;
