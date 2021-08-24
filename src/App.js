import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

import { AuthenticationProvider } from './context/AuthenticationContext';
import { ProceduresProvider } from "./context/ProceduresContext";
import { MachinesProvider } from "./context/MachinesContext";
import { OperatorsProvider } from "./context/OperatorsContext";
import { ProductionLinesProvider } from './context/ProductionLinesContext';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  return (
    <>
    <ProceduresProvider>
      <ProductionLinesProvider>
      <OperatorsProvider>
      <MachinesProvider>
        <AuthenticationProvider>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/app" component={Layout} />
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Router>
        </AuthenticationProvider>
      </MachinesProvider>
      </OperatorsProvider>
      </ProductionLinesProvider>
    </ProceduresProvider>
    </>
  )
}

export default App
