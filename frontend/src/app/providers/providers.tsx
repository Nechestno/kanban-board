import { ConfigProvider } from 'antd';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store.ts';

interface IProviders {
  readonly children: React.ReactNode;
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