import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'semantic-ui-css/semantic.min.css'
import Application from './components/Application';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
          <Application />
        </AppContainer>,
        mainElement
    );
};

// @ts-ignore
render()
