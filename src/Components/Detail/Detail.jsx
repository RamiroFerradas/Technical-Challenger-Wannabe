import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import Loader from "../Loader/Loader";
import useFetchDetails from "../../Hooks/useFetchDetails";
import useFetchPlanets from "../../Hooks/useFetchPlanets";
import useFetchSpecies from "../../Hooks/useFetchSpecies";
import useTheme from "../../Hooks/useTheme";
import { textTransformation } from "../../Utils/TextTransformation";
import { Button, Card, Container } from "react-bootstrap";

export default function Detail({ url, setCharacterDetails, characterDetails }) {
  const { detail, setDetail } = useFetchDetails(url);
  const { planet, fetchDetailsPlanets } = useFetchPlanets();
  const { species, fetchSpecies } = useFetchSpecies();
  const { theme } = useTheme();

  useEffect(() => {
    fetchDetailsPlanets(detail.homeworld);
    fetchSpecies(detail.species);
  }, [detail]);

  const handleClose = () => {
    setCharacterDetails(!characterDetails);
    setDetail("detail", {});
  };

  return (
    <div className={styles.body}>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        {!detail.name ? (
          <Loader />
        ) : (
          <Card
            border="warning"
            bg={theme === "dark" ? "dark" : "secondary"}
            text="light"
            style={{ width: "18rem", height: "24rem" }}
            className="mb-2 text-center"
          >
            <Card.Body>
              <Card.Title className="text-uppercase">{detail.name}</Card.Title>

              <Card.Text className="mt-4 text-center">
                <span>Height: {detail.height} mts.</span>
              </Card.Text>
              <Card.Text>
                <span>Hair color: {textTransformation(detail.hair_color)}</span>
              </Card.Text>
              <Card.Text>
                <span>Skin color: {textTransformation(detail.skin_color)}</span>
              </Card.Text>
              <Card.Text>
                <span>Birth year: {textTransformation(detail.birth_year)}</span>
              </Card.Text>
              <Card.Text>
                <span>Gender: {textTransformation(detail.gender)}</span>
              </Card.Text>
              {planet.length ? (
                <Card.Text>
                  <span>Homeworld: {textTransformation(planet)}</span>
                </Card.Text>
              ) : (
                <span></span>
              )}

              {species.length ? (
                <Card.Text>
                  <span>Species: {species}</span>
                </Card.Text>
              ) : (
                <span></span>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
      {detail.name && (
        <Button variant="outline-warning" onClick={handleClose}>
          Close
        </Button>
      )}
    </div>
  );
}
