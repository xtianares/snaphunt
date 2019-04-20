import React from "react";
import { Container, Row, Col } from 'reactstrap';

function NoMatch() {
  return (
    <Container>
      <Row>
        <Col size="md-12" >
          <h1 className="text-center">404 Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
