import { Puff } from '@agney/react-loading';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routing } from './core/Routing';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { LoadingStore } from './store/loadingStore';




const App = observer(({ loading }: { loading: any }) => (
  loading.load ?
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "200px" }}>
        <Puff />
      </div>
    </div>
    :
    <Routing />
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
