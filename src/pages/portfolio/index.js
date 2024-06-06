import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";

export const Portfolio = () => {
  const [dataportfolio, setDataportfolio] = useState([]);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      const username = 'RodolfoChubby'; // Cambia esto por el nombre de usuario de GitHub
      const apiUrl = `https://api.github.com/users/${username}/repos`;

      const imageUrls = [
        "https://picsum.photos/400/?grayscale",
        "https://picsum.photos/400/800/?grayscale",
        "https://picsum.photos/400/600/?grayscale",
        "https://picsum.photos/400/300/?grayscale",
        "https://picsum.photos/400/700/?grayscale",
        "https://picsum.photos/400/550/?grayscale",
      ];

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error al obtener los repositorios');
        }
        const repos = await response.json();
        const updatedDataPortfolio = repos.map((repo, index) => ({
          img: imageUrls[index % imageUrls.length], // Asignar imágenes en orden y repetir si es necesario
          description: capitalizeFirstLetter(repo.name), // Capitalizar primer letra del nombre del repositorio
          link: repo.html_url,
        }));
        setDataportfolio(updatedDataPortfolio);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGitHubRepos();
  }, []);

  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => (
            <div key={i} className="po_item">
              <img src={data.img} alt="" />
              <div className="content">
                <p>{data.description}</p>
                <a href={data.link} target="_blank" rel="noopener noreferrer">view project</a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </HelmetProvider>
  );
};
