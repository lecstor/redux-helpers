function actionTypeCreator(reducerName: string) {
  return (name: string) => `app/${reducerName}/${name}`;
}

export default actionTypeCreator;
