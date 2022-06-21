import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { PostsList } from './features/posts/PostsList'

import { Navbar } from './app/Navbar'
import store from './app/store'
import React from 'react'
import { AddPostForm } from './features/posts/AddPostForm'

function SocialMediaFeed() {
  return (
    <Provider store={store}>
      <Router>
        <div className="social-media-app">
          <Navbar/>
          <div className="App">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <React.Fragment>
                    <AddPostForm/>
                    <PostsList/>
                  </React.Fragment>
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default SocialMediaFeed;
