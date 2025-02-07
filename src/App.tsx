
import './style.scss';
import './font.scss'
import { BrowserRouter as Router } from 'react-router-dom';
import {ProjectRoutes} from "./shared/ProjectRoutes/Routes.tsx";
import {ConfigProvider} from "antd";

const App = ()=>  {

  return (
      <ConfigProvider theme={{
          token:{
              fontFamily: "'Open Sans', sans-serif",
          }
      }}>
          <Router>
            <ProjectRoutes/>
          </Router>
      </ConfigProvider>
  )
}

export default App
