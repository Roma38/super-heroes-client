import React, { useState, useEffect } from "react";
import { Segment, Button, Header, Image } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteHero } from "../redux/actions/heroes";
import { API_HOST } from "../config";
import { history } from "../history";


function EditHero() {
  const { id } = useParams();
  const heroes = useSelector(state => state.heroes);
  const [hero, setHero] = useState({ 
    nickname: "", 
    realName: "", 
    description: "", 
    superPowers: "", 
    catchPhrase: "", 
    images: [] 
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroes.loadingState === "succeed") {
      setHero(heroes.items.find(({ _id }) => _id === id));
    }
  }, [heroes, id]);

  const deleteHandler = () => {
    dispatch(deleteHero(id));
    history.push("/");
  }

  return (
    <Segment className="segment-block" >
      <Header as="h1" textAlign="center" content={hero.nickname} />
      <Header as="h2" color="grey" textAlign="center" content={hero.realName} />

      <Image.Group size='small'>
        {hero.images.map(picture => <Image
          key={picture}
          src={`${API_HOST}/images/${picture}`}
          wrapped
          ui={false}
        />)}
      </Image.Group>

      <p>{hero.description}</p>
      <p><strong>Super power: </strong>{hero.superPowers}</p>
      <p><strong>Catch phrase: </strong>{hero.catchPhrase}</p>

      <div className="buttons-align-wrapper">
        <Button as={Link} to={`/edit/${id}`} positive>Edit</Button>
        <Button onClick={deleteHandler} negative>Delete</Button>
        <Button as={Link} to={"/"} primary>Back</Button>
      </div>
    </Segment>
  );
}
export default EditHero;