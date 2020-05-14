import React, { useState } from "react";
import { Header, Card, Image, Pagination } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import HeroCard from "../components/HeroCard";
import { API_HOST, HEROES_PER_PAGE } from "../config";

function HomePage() {
  const heroes = useSelector(state => state.heroes.items);
  const [activePage, setActivePage] = useState(1);
  return (
    <>
      <Header as="h1" textAlign="center" content="Super heroes" />
      <Card.Group centered>
        {heroes.slice(activePage * HEROES_PER_PAGE - HEROES_PER_PAGE, activePage * HEROES_PER_PAGE)
          .map(hero => <HeroCard hero={hero} key={hero._id} />)}
  
        <Card to="/add" as={Link}>
          <Image src={`${API_HOST}/images/image.png`} />
          <Card.Content header="Add Hero" textAlign="center" />
        </Card>
      </Card.Group>
      <div className="pagination-wrapper">
        <Pagination
          activePage={activePage}
          onPageChange={(e, { activePage }) => setActivePage(activePage)}
          size='mini'
          boundaryRange={0}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.ceil(heroes.length / HEROES_PER_PAGE)}
        />
      </div>
    </>
  );
}
export default HomePage;