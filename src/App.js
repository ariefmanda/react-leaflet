import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import { Menu, Layout} from 'antd';
import { observer } from 'mobx-react';
import Home from './components/Home'
import Waze from './components/Waze'
import Notfound from './components/NotFound'
import './App.css';
import 'antd/dist/antd.css'
const { Header, Content, Footer } = Layout;

@observer class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to='/'>REACT-LEAFLET</Link>
              </Menu.Item>
              <Menu.Item key="alipay">
                <Link to='/waze'>Waze</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/waze" component={Waze} />
              <Route path="*" component={Notfound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Build ©2018
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
