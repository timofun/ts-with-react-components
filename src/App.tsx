import React from 'react'
import './App.css'
import './styles/index.scss'
import Button, { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Default} disabled className="asdasd">Hello</Button>
        <Button size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hells</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hells</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">baidu</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>baidu</Button>
      </header>
    </div>
  );
}

export default App;
