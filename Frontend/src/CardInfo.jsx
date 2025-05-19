import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Rating from './Rating';

const CardInfo = () => {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/get-all-store')
      .then(response => response.json())
      .then(data => setStoreData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

    <Container className="my-5">
      <h3 className="mb-4 text-center text-primary fw-bold">Store Listings</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {storeData.map((store) => (
          <Col key={store.id}>
            <Card style={{ backgroundColor: "#547aa5" }} className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="text-white">{store.store_name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {store.store_email}
                </Card.Text>
                <Card.Text>
                  <strong>Address:</strong> {store.store_address}
                </Card.Text>
                <Card.Text>
                 <strong>
                  <>
                    <Rating/>
                  </>
                 </strong>
                </Card.Text>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    

    </div>
  );
};

export default CardInfo;
