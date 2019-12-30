import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import MenuMaps from './MenuMaps';
import PopulationToulouse from './recensement-population/PopulationToulouse';
import Poi from './poi/Poi'
import { Row, Layout, Typography, Icon } from 'antd';
import Meteo from './meteo/Meteo'
import AccueilData from './AccueilData'
import FooterLogos from './FooterLogos';
import './app-style.scss'

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;


export default class App extends Component {

  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { collapsed } = this.state
    return (
      <Fragment>
        <Router>
          <Layout style={{ 'height': '100vh' }}>
            <Header>
              <div style={{ position: 'absolute' }}>
                <div>
                  <Title
                    level={3}
                    className='title'>
                    <Link to='/'>
                      DATA TOLOSA
                </Link>
                  </Title>
                </div>
              </div>
            </Header>
            <Layout>
              <Sider
                collapsed={collapsed}>
                <Icon
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                  className='icon trigger'
                />
                <MenuMaps />
              </Sider>
              <Content>
                <Row>
                  <Switch>
                    <Route exact path="/" component={AccueilData} />
                    <Route path="/toulouse-population" component={PopulationToulouse} />
                    <Route path="/toulouse-poi" component={Poi} />
                    <Route path="/toulouse-meteo" component={Meteo} />
                  </Switch>
                </Row>
              </Content>
            </Layout>
            <Footer>
              <FooterLogos />
            </Footer>
          </Layout>
        </Router>
      </Fragment>
    )
  }
}

