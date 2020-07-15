import React from 'react'
import './App.css'
import './styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
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
        <Button btnType={ButtonType.Default} disabled className="asdasd">Hello</Button>
        <Button size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hells</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hells</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">baidu</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>baidu</Button>
      </header>
    </div>
  );
}

export default App;
