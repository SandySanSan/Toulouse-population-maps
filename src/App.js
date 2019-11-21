import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MenuMaps from './MenuMaps';
import Population2012 from './recensement-population/Population2012';
import { Row, Layout } from 'antd';
import "antd/dist/antd.css";


const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  return (
    <Fragment>
      <Router>
        <Layout style={{ 'height': '100vh' }}>
          <Header>Header</Header>
          <Layout>
            <Sider>
              <MenuMaps />
            </Sider>
            <Content>
              <Row>
                <Switch>
                  <Route path="/toulouse-population" component={Population2012} />
                </Switch>
              </Row>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </Router>
    </Fragment>
  );
}

