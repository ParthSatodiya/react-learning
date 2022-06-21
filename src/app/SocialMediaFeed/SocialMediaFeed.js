import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import store from './app/store'

function SocialMediaFeed() {
  return (
    <Provider store={store}>
      <Router className={'social-media-app'}>
        <Navbar />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <section>
                  <h2>Welcome to the Redux Essentials example app!</h2>
                </section>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default SocialMediaFeed;
