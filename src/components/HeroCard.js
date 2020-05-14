import React, { useState } from "react";
import { Card, Image, Button, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteHero } from "../redux/actions/heroes";
import { API_HOST } from "../config";

function HeroCard({ hero: { _id, nickname, images } }) {
  const dispatch = useDispatch();
  const [isConfirmOpened, setisConfirmOpened] = useState(false)

  return (
    <Card>
      <Image
        as={Link} to={`/detail/${_id}`}
        src={`${API_HOST}/images/${images[0] || "image.png"}`}
        wrapped
        ui={false}
      />
      <Card.Content textAlign="center" as={Link} to={`/detail/${_id}`}>
        <Card.Header>{nickname}</Card.Header>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Button as={Link} to={`/edit/${_id}`} positive content="Edit" />
        <Button
          negative
          content="Delete"
          onClick={() => setisConfirmOpened(true)}
        />
      </Card.Content>

      <Confirm
        header='Are you sure want to delete this Hero?!'
        open={isConfirmOpened}
        onCancel={() => setisConfirmOpened(false)}
        onConfirm={() => dispatch(deleteHero(_id))}
        confirmButton="Yes"
        cancelButton='No'
        size='small'
      />
    </Card>
  );
}

export default HeroCard;
