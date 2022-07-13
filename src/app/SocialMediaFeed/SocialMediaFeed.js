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
import React, { useEffect } from 'react'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { fetchUsers } from './features/users/usersSlice'

function SocialMediaFeed() {

  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);
  

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
              <Route exact path="/posts/:postId" component={SinglePostPage}/>
              <Route exact path="/editPost/:postId" component={EditPostForm}/>
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default SocialMediaFeed;
