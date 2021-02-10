import React from 'react';
import './scss/app.scss';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Header } from './components';
import { Cart, Home, SingUp, Account, Edit, Login } from './pages';

import { PrivateRoute } from './hoc/PrivateRoute';
import { meFromToken, meFromTokenFailure, meFromTokenSuccess } from './redux/actions/user';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (!token || token === '') return;
    dispatch(meFromToken(token))
      .then(({ data }) => {
        dispatch(meFromTokenSuccess(data));
      })
      .catch((err) => {
        localStorage.removeItem('token');
        dispatch(meFromTokenFailure(err.message));
        history.push('/');
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signup" component={SingUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/edit" component={Edit} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
