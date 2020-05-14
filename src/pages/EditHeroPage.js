import React, { useState, useEffect } from "react";
import { Form, Button, Header, Image } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { putHero } from "../redux/actions/heroes";
import { API_HOST } from "../config";


function EditHero() {
  const { id } = useParams();
  const [hero, setHero] = useState({
    nickname: "",
    realName: "",
    description: "",
    superPowers: "",
    catchPhrase: "",
    images: []
  });
  const [heroPictures, setHeroPictures] = useState([]);
  const heroes = useSelector(state => state.heroes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroes.loadingState === "succeed") {
      setHero(heroes.items.find(({ _id }) => _id === id));
    }
  }, [heroes, id]);

  const submitHandler = () => {
    const data = new FormData();
    data.append("hero", JSON.stringify(hero));
    if (heroPictures.length) {
      heroPictures.forEach(image => {
        data.append("images[]", image);
      });
    }
    dispatch(putHero(data));
  };

  return (
    <Form className="add-edit-form" onSubmit={submitHandler}>
      <Header as="h1" textAlign="center" content="Edit hero" />

      <Image.Group size='small'>
        {hero.images.map((pictureName, index) =>
          <Image centered
            key={pictureName}
            src={`${API_HOST}/images/${pictureName}`}
            label={{
              color: 'red',
              ribbon: 'right',
              icon: "close",
              onClick: () => setHero({ ...hero, images: hero.images.filter((_, _index) => index !== _index) })
            }}
          />)}

        {heroPictures.map((picture, index) =>
          <Image centered
            key={picture.name}
            src={URL.createObjectURL(picture)}
            label={{
              color: 'red',
              ribbon: 'right',
              icon: "close",
              onClick: () => setHeroPictures(heroPictures.filter((_, _index) => index !== _index))
            }}
          />)}
      </Image.Group>

      <Form.Input
        label="Nickname:"
        placeholder="Nickname"
        value={hero.nickname}
        onChange={(e, data) => setHero({ ...hero, nickname: data.value })}
        required
      />
      <Form.Input
        label="Real Name:"
        placeholder="Real Name"
        value={hero.realName}
        onChange={(e, data) => setHero({ ...hero, realName: data.value })}
      />
      <Form.TextArea
        label="About Hero:"
        placeholder="Few words about hero"
        value={hero.description}
        onChange={(e, data) => setHero({ ...hero, description: data.value })}
      />
      <Form.TextArea
        label="Super-powers:"
        placeholder="Heroes super-powers"
        value={hero.superPowers}
        onChange={(e, data) => setHero({ ...hero, superPowers: data.value })}
      />
      <Form.Input
        label="Catch phrase:"
        placeholder="Catch phrase"
        value={hero.catchPhrase}
        onChange={(e, data) => setHero({ ...hero, catchPhrase: data.value })}
      />
      <div className="buttons-align-wrapper">
        <Form.Field inline>
          <Button
            as="label"
            htmlFor="upload"
            icon="upload"
            content="Upload Picture"
            primary={Boolean(heroPictures)}
          />
        </Form.Field>
        <input
          hidden
          id="upload"
          type="file"
          multiple
          onChange={e => setHeroPictures(heroPictures.concat(Array.from(e.target.files)))}
        />
        <Button type="submit" positive>
          Save
        </Button>
        <Button as={Link} to={"/"} negative>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
export default EditHero;