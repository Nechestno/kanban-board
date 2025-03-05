import store, { persistor } from '../store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { ConfigProvider } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface IProviders {
  readonly children: JSX.Element;
}

export const Providers: React.FC<IProviders> = ({ children }) => {
  return (
    <ConfigProvider theme={{
      token: {
        fontFamily: '\'Open Sans\', sans-serif',
      },
    }}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </DndProvider>
    </ConfigProvider>
  );
};