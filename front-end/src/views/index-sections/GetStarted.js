import React from "react";
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Container,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  InputGroup,
  Label
} from "reactstrap";

// core components

function GetStarted() {
  const [leftFocus, setLeftFocus] = React.useState(false);
  return (
    <>
      <div
        className="section section-download"
        id="get-started"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="8" md="12">
              <h3 className="title">Try this Regex Generator</h3>
              <h5 className="description">
                Desciption here
              </h5>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <Row>
            <Col lg="11" sm="6">
              <InputGroup className={leftFocus ? "input-group-focus" : ""}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-angle-right"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Please enter the strings to create the regex"
                  type="text"
                  onFocus={() => setLeftFocus(true)}
                  onBlur={() => setLeftFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <Col lg="1" sm="2">
              <Button className="btn-round" type="button" color="info" style={{ margin: 0 }}>
                Get
              </Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row id="checkRadios">
            <Col lg="2" sm="6">
              <p className="category">Case Sensitive </p>
              <Switch defaultValue={false} offColor="" onColor=""></Switch>
            </Col>
            <Col lg="3" sm="6">
              <p className="category">Global</p>
              <Switch defaultValue={false} offColor="" onColor=""></Switch>
            </Col>
            <Col className="mb-4" lg="3" sm="6">
              <p className="category">Pattern Type</p>
              <FormGroup check>
              <Label check>
                <Input defaultChecked type="checkbox"></Input>
                <span className="form-check-sign"></span>
                Normal
              </Label>
            </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"></Input>
                  <span className="form-check-sign"></span>
                  Words
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <span className="form-check-sign"></span>
                  Dates
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="12">
              <h2>/(regex)$/</h2>
            </Col>
          </Row>
          <br></br>
          <br></br>

          <Row>
            <Col className="mb-4" lg="12" sm="6">
              <p className="category">Choose Methods</p>
              <FormGroup check className="form-check-radio">
                <Row>
                  <Col lg="2">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                  Test
                </Label>
                  </Col>
                  <Col lg="2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                  Exec
                </Label>
                  </Col>
                  <Col lg="2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                  Match
                </Label>
                  </Col>
                  <Col lg="2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                  Replace
                </Label>
                  </Col>
                  <Col lg="2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                  Search
                </Label>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="11" sm="6">
              <InputGroup className={leftFocus ? "input-group-focus" : ""}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-angle-right"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Test the regex here with keywords"
                  type="text"
                  onFocus={() => setLeftFocus(true)}
                  onBlur={() => setLeftFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <Col lg="1" sm="2">
              <Button className="btn-round" type="button" color="info" style={{ margin: 0 }}>
                Check
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="12">
              <h2>Test Results</h2>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Thank you for supporting us!</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default GetStarted;
