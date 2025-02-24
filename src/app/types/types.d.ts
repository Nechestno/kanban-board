declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare type RootState = ReturnType<typeof import('./store').store.getState>;
declare type AppDispatch = typeof import('./store').store.dispatch;
