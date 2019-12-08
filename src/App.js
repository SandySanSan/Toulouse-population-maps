import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MenuMaps from './MenuMaps';
import PopulationToulouse from './recensement-population/PopulationToulouse';
import Poi from './poi/Poi'
import { Row, Layout, Typography } from 'antd';
import { styleTitle } from './style'
import Meteo from './meteo/Meteo'

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;


export default function App() {
  return (
    <Fragment>
      <Router>
        <Layout style={{ 'height': '100vh' }}>
          <Header><Title level={3} style={styleTitle}>DATA TOLOSA</Title></Header>
          <Layout>
            <Sider>
              <MenuMaps />
            </Sider>
            <Content>
              <Row>
                <Switch>
                  <Route path="/toulouse-population" component={PopulationToulouse} />
                  <Route path="/toulouse-poi" component={Poi} />
                  <Route path="/toulouse-meteo" component={Meteo} />

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

