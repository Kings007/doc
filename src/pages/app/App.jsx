import React from 'react'
import { Route, Switch, NavLink} from 'react-router-dom'

import Atag from '../atag'

export default class App extends React.Component{
  render() {
    return (
      <div>
        导航栏：
        <nav>
          <NavLink to="a-tag">a标签</NavLink>
        </nav>
        内容区：
        <Switch>
          <Route path="/a-tag" component={Atag}/>
        </Switch>
      </div>
    )
  }
}