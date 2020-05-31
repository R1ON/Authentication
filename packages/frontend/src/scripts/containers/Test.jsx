import React from 'react';
// import universal from 'react-universal-component';
import { Link, Switch, Route } from 'react-router-dom';
import LandingPage from './Test2';
import styles from './test.module.scss';


// export default universal(() => import('./Test2'));

const Test = () => (
  <div className={styles.test}>
    <Switch>
      <Route exact path="/" render={() => <div>/</div>} />
      <Route exact path="/test" render={() => <div>test</div>} />
    </Switch>

    <Link to="/test">CLICK ME</Link>
  </div>
);

export default Test;
