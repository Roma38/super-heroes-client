import React, { useEffect } from "react";
import { Container, Dimmer, Loader, Message } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./pages/HomePage";
import AddHeroPage from "./pages/AddHeroPage";
import EditHeroPage from "./pages/EditHeroPage";
import HeroDetailPage from "./pages/HeroDetailPage";
import { getHeroes } from "./redux/actions/heroes";
import "./App.scss";

const useFetching = actionCreator => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreator());
  }, [actionCreator, dispatch]);
};

function App() {
  const heroes = useSelector(state => state.heroes);
  useFetching(getHeroes);

  return (
    <Container className="application">
      {heroes.loadingState === "loading" &&
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>}
      {heroes.loadingState === "failed" &&
        <Message negative>
          <Message.Header>Looks like, something went wrong</Message.Header>
          <p>{heroes.error}</p>
        </Message>}
      {heroes.loadingState === "succeed" && <>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/add">
          <AddHeroPage />
        </Route>

        <Route path="/edit/:id">
          <EditHeroPage />
        </Route>
        
        <Route path="/detail/:id">
          <HeroDetailPage />
        </Route>
      </>}
    </Container>
  );
}

export default App;
