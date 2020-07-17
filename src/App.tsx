import React from 'react'
import './App.css'
import './styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu className="App-menu" defaultIndex="0" onSelect={(index) => {}}>
          <MenuItem>menu1</MenuItem>
          <SubMenu title={'ahhahah'}>
            <MenuItem>menu1</MenuItem>
            <MenuItem>
              menu2
            </MenuItem>
            <MenuItem>menu3</MenuItem>
          </SubMenu>
          <MenuItem>
            menu2
          </MenuItem>
          <MenuItem>menu3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
