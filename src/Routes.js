import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from './utils/history';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPage from './pages/ForgotPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import AddPostPage from './pages/AddPostPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import BookmarksPage from './pages/BookmarksPage';
import BankPage from './pages/BankPage';
import CardPage from './pages/CardPage';
import ShopPage from './pages/ShopPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AccountPage from './pages/AccountPage';
import FansPage from './pages/FansPage';
import PrivacySafetyPage from './pages/PrivacySafetyPage';
import NotificationSettingPage from './pages/NotificationSettingPage';
import LogoutPage from './pages/LogoutPage';
import Fans from './pages/Fans'
import HelpPage from './pages/HelpPage';
import Following from './pages/Following'
import Comments from  './pages/Comments'
const PrivateRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => {
      const item = localStorage.getItem('is_login');
      return (item !== null && item !== "") ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      );
    }}
  />
);

const AuthRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => {
      const item = localStorage.getItem('is_login');
      return (item == null && item == "") ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to={{ pathname: '/home' }} />
      );
    }}
  />
);

const Routes = () => {
  const storeUser = useSelector((state) => state.user);
  const [user] = useState(storeUser);
  return (
    <BrowserRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/sign-up" component={SignupPage} />
          <Route path="/forgot-password" component={ForgotPage}/>
          <PrivateRoute path="/home" user={user} component={HomePage} />
          <PrivateRoute path="/chat" user={user} component={ChatPage} />
          <PrivateRoute path="/add-post" user={user} component={AddPostPage} />
          <PrivateRoute path="/notifications" user={user} component={NotificationsPage} />
          <PrivateRoute path="/Help" user={user} component={HelpPage} />
          <PrivateRoute exact path="/profile" user={user} component={ProfilePage} />
          <PrivateRoute path="/bookmarks" user={user} component={BookmarksPage} />
          <PrivateRoute path="/bank" user={user} component={BankPage} />
          <PrivateRoute path="/cards" user={user} component={CardPage} />
          <PrivateRoute path="/profile/shop" user={user} component={ShopPage} />
          <PrivateRoute path="/settings/profile" user={user} component={ProfileSettingsPage} />
          <PrivateRoute exact path="/settings/account" user={user} component={AccountPage} />
          <PrivateRoute path="/settings/fans-following" user={user} component={FansPage} />
          <PrivateRoute path="/settings/privacy-safety" user={user} component={PrivacySafetyPage} />
          <PrivateRoute path="/settings/notifications" user={user} component={NotificationSettingPage} />
          <PrivateRoute path="/logout" user={user} component={LogoutPage} />
          <PrivateRoute path="/fans" user={user} component={Fans} />
          <PrivateRoute path="/following" user={user} component={Following} />
          <PrivateRoute path="/comments" user={user} component={Comments} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
