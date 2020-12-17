import { Puff } from '@agney/react-loading';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routing } from './core/Routing';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { LoadingStore } from './store/loadingStore';




const App = observer(({ loading }: { loading: any }) => (
  <>
  <Routing/> 
  {
   loading.load &&
      <div style={{ position: "absolute", width: "20%", top: "28%", left: "40%" }}>
        <Puff />
      </div>
  }
  
  </>
    
))

ReactDOM.render(
  <React.StrictMode>
    <App loading={LoadingStore} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
