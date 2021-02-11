import regexGenerator from "@sra1bejugam/regex-nlp";
import React, {
  Component
} from 'react';
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
// import {
//   withStyles
// } from '@material-ui/core';

export class GetStarted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: null,
      testingKeywords: null,
      selectedOptionCase: null,
      selectedOptionGlobal: null,
      isNormalForm: true,
      isWordsForm: null,
      isDatesForm: null,
      selectedOptionIsWords: null,
      selectedOptionIsDates: null,
      selectedOptionIsTest: null,
      selectedOptionIsExec: null,
      selectedOptionIsMatch: null,
      selectedOptionIsReplace: null,
      selectedOptionIsSearch: null,
      isTestChecked: null,
      isExecChecked: null,
      isMatchChecked: null,
      isReplaceChecked: null,
      isSearchChecked: null,
      regexPattern: null,
      replaceWithThisKeyword:null,
      testResult: [{ keyword: null, eq: 'false' }]
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleTestingKeywords=this.handleTestingKeywords.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.getRegexPatern = this.getRegexPatern.bind(this);
  }

  handleTextInput = (event) => {
    this.setState({
      inputText: event.target.value
    });
  };

  handleTestingKeywords = (event) => {
    console.log("🚀 ~ file: GetStarted.js ~ line 66 ~ GetStarted ~ event.target.value", event.target.value)
    this.setState({
      testingKeywords: event.target.value
    });
  };

  handleReplaceKeyword = (event) => {
    this.setState({
      replaceWithThisKeyword: event.target.value
    });
  };

  handleCaseChange = (event) => {
    this.setState({
      selectedOptionCase: event.state.value
    })
  }

  handleGlobalChange = (event) => {
    this.setState({
      selectedOptionGlobal: event.state.value
    })
    console.log("🚀 ~ file: GetStarted.js ~ line 77 ~ GetStarted ~ selectedOptionGlobal", this.state.selectedOptionGlobal)
  }

  handleChoosenNormal = (event) => {
    this.setState({ isWordsForm: false });
    this.setState({ isDatesForm: false });
    this.setState({ selectedOptionIsWords: false });
    this.setState({ selectedOptionIsDates: false });
    this.setState({ isNormalForm: event.target.checked });
  };

  handleChoosenWords = (event) => {
    this.setState({ isWordsForm: event.target.checked });
    this.setState({ selectedOptionIsWords: event.target.name });
    this.setState({ isNormalForm: false });
    this.setState({ isDatesForm: false });
    this.setState({ selectedOptionIsDates: false });
  };

  handleChoosenDates = (event) => {
    this.setState({ isDatesForm: event.target.checked });
    this.setState({ selectedOptionIsDates: event.target.name });
    this.setState({ isWordsForm: false });
    this.setState({ isNormalForm: false });
    this.setState({ selectedOptionIsWords: false });
  };

  testChecked = (event) => {
    console.log("🚀 ~ file: GetStarted.js ~ line 86 ~ GetStarted ~ event", event, '--', event.target.name);
    this.setState({ isTestChecked: event.target.checked });
    this.setState({ isExecChecked: false });
    this.setState({ isMatchChecked: false });
    this.setState({ isReplaceChecked: false });
    this.setState({ isSearchChecked: false });
    this.setState({ selectedOptionIsTest: event.target.name });
    this.setState({ selectedOptionIsExec: false });
    this.setState({ selectedOptionIsMatch: false });
    this.setState({ selectedOptionIsReplace: false });
    this.setState({ selectedOptionIsSearch: false });
  };

  execChecked = (event) => {
    this.setState({ isExecChecked: event.target.checked });
    this.setState({ isMatchChecked: false });
    this.setState({ isTestChecked: false });
    this.setState({ isReplaceChecked: false });
    this.setState({ isSearchChecked: false });
    this.setState({ selectedOptionIsExec: event.target.name });
    this.setState({ selectedOptionIsTest: false });
    this.setState({ selectedOptionIsMatch: false });
    this.setState({ selectedOptionIsReplace: false });
    this.setState({ selectedOptionIsSearch: false });
  };
  matchChecked = (event) => {
    this.setState({ isMatchChecked: event.target.checked });
    this.setState({ isTestChecked: false });
    this.setState({ isReplaceChecked: false });
    this.setState({ isSearchChecked: false });
    this.setState({ isExecChecked: false });
    this.setState({ selectedOptionIsMatch: event.target.name });
    this.setState({ selectedOptionIsTest: false });
    this.setState({ selectedOptionIsExec: false });
    this.setState({ selectedOptionIsReplace: false });
    this.setState({ selectedOptionIsSearch: false });
  };
  replaceChecked = (event) => {
    this.setState({ isReplaceChecked: event.target.checked });
    this.setState({ isTestChecked: false });
    this.setState({ isExecChecked: false });
    this.setState({ isMatchChecked: false });
    this.setState({ isSearchChecked: false });
    this.setState({ selectedOptionIsReplace: event.target.name });
    this.setState({ selectedOptionIsTest: false });
    this.setState({ selectedOptionIsExec: false });
    this.setState({ selectedOptionIsMatch: false });
    this.setState({ selectedOptionIsSearch: false });
  };
  searchChecked = (event) => {
    this.setState({ isSearchChecked: event.target.checked });
    this.setState({ isTestChecked: false });
    this.setState({ isExecChecked: false });
    this.setState({ isMatchChecked: false });
    this.setState({ isReplaceChecked: false });
    this.setState({ selectedOptionIsSearch: event.target.name });
    this.setState({ selectedOptionIsTest: false });
    this.setState({ selectedOptionIsExec: false });
    this.setState({ selectedOptionIsMatch: false });
    this.setState({ selectedOptionIsReplace: false });
  };

  handleGetRegex = async () => {
    let caseSense = this.state.selectedOptionCase;
    let isGlobal = this.state.selectedOptionGlobal;
    console.log("🚀 ~ file: GetStarted.js ~ line 150 ~ GetStarted ~ handleGetRegex= ~ isGlobal", isGlobal)
    let areWords = this.state.isNormalForm ? this.state.isNormalForm : this.state.selectedOptionIsWords ? this.state.selectedOptionIsWords : this.state.selectedOptionIsDates;
    let pattern = await regexGenerator.regexEquation(this.state.inputText, caseSense, isGlobal, areWords);
    this.setState({
      regexPattern: pattern
    });
  };

  testKeywords = async () => {
    let caseSense = this.state.selectedOptionCase;
    let isGlobal = this.state.selectedOptionGlobal;
    let method = null;
    let replaceString='';
    console.log("🚀 ~ file: GetStarted.js ~ line 216 ~ GetStarted ~ testKeywords= ~ this.state.testingKeywords", this.state.testingKeywords)
    console.log("🚀 ~ file: GetStarted.js ~ line 192 ~ GetStarted ~ testKeywords= ~ this.state.selectedOptionIsTest",
     this.state.selectedOptionIsTest,this.state.selectedOptionIsExec,this.state.selectedOptionIsMatch,
     this.state.selectedOptionIsReplace,this.state.selectedOptionIsSearch
    )

    if (this.state.selectedOptionIsTest) {
      method = this.state.selectedOptionIsTest;
    }
     if (this.state.selectedOptionIsExec) {
      method = this.state.selectedOptionIsExec;
    } 
     if (this.state.selectedOptionIsMatch) {
      method = this.state.selectedOptionIsMatch;
    }
     if (this.state.selectedOptionIsReplace) {
      method = this.state.selectedOptionIsReplace;
    }
     if (this.state.selectedOptionIsSearch) {
      method = this.state.selectedOptionIsSearch;
    }
    if(this.state.replaceWithThisKeyword){
      replaceString = this.state.replaceWithThisKeyword;
    }
    console.log("🚀 ~ file: GetStarted.js ~ line 170 ~ GetStarted ~ testKeywords= ~ method",this.state.regexPattern, method,this.state.replaceWithThisKeyword,replaceString)
    let testResult = await regexGenerator.validateRegexEquation(this.state.testingKeywords, caseSense, isGlobal, this.state.regexPattern, method, replaceString);
    await this.setState({
      testResult
    });
    console.log('finaleq--------------------------', this.state.testResult);
  };

  render() {
    const { classes } = this.props;
    const { selectedOptionCase, displayEquation, testResult, isTestChecked, isMatchChecked, isExecChecked, isReplaceChecked, isSearchChecked, selectedOptionIsTest, selectedOptionIsSearch, selectedOptionIsExec, selectedOptionIsMatch, selectedOptionIsReplace, isWordsForm, isDatesForm, selectedOptionGlobal, inputText, selectedStringToReplaceWith, isNormalForm, testResults, selectedOptionIsWords, isWordsInCheck, isDates, selectedOptionIsDates, selectedOptionInMethod } = this.state;
    // const [leftFocus, setLeftFocus] = React.useState(false);

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
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-angle-right"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Please enter the strings to create the regex"
                    type="text"
                    onChange={this.handleTextInput}
                  ></Input>
                </InputGroup>
              </Col>
              <Col lg="1" sm="2">
                <Button onClick={this.handleGetRegex} disabled={this.state.inputText && this.state.inputText.length ? false : true} className="btn-round" type="button" color="info" style={{ margin: 0 }}>
                  Get
              </Button>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <Row id="checkRadios">
              <Col lg="2" sm="6">
                <p className="category">Case Sensitive </p>
                <Switch defaultValue={false} onChange={this.handleCaseChange} offColor="" onColor=""></Switch>
              </Col>
              <Col lg="3" sm="6">
                <p className="category">Global</p>
                <Switch defaultValue={false} onChange={this.handleGlobalChange} offColor="" onColor=""></Switch>
              </Col>
              <Col className="mb-4" lg="3" sm="6">
                <p className="category">Pattern Type</p>
                <FormGroup check>
                  <Label check>
                    <Input checked={isNormalForm} onChange={this.handleChoosenNormal} name="normal" type="checkbox"></Input>
                    <span className="form-check-sign"></span>
                Normal
              </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input checked={isWordsForm} onChange={this.handleChoosenWords} name="words" type="checkbox"></Input>
                    <span className="form-check-sign"></span>
                  Words
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input checked={isDatesForm} onChange={this.handleChoosenDates} name="dates" type="checkbox"></Input>
                    <span className="form-check-sign"></span>
                  Dates
                </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row className="text-center mt-5">
              <Col className="ml-auto mr-auto" md="12">
                <h2>{this.state.regexPattern}</h2>
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
                          checked={isTestChecked}
                          onChange={this.testChecked}
                          defaultValue="option1"
                          id="test"
                          name="test"
                          type="radio"
                        ></Input>
                        <span className="form-check-sign"></span>
                  Test
                </Label>
                    </Col>
                    <Col lg="2">
                      <Label check>
                        <Input
                          checked={isExecChecked}
                          onChange={this.execChecked}
                          defaultValue="option2"
                          id="Execute"
                          name="exec"
                          type="radio"
                        ></Input>
                        <span className="form-check-sign"></span>
                  Exec
                </Label>
                    </Col>
                    <Col lg="2">
                      <Label check>
                        <Input
                          checked={isMatchChecked}
                          onChange={this.matchChecked}
                          defaultValue="option2"
                          id="match"
                          name="match"
                          type="radio"
                        ></Input>
                        <span className="form-check-sign"></span>
                  Match
                </Label>
                    </Col>
                    <Col lg="2">
                      <Label check>
                        <Input
                          checked={isReplaceChecked}
                          onChange={this.replaceChecked}
                          defaultValue="option2"
                          id="replace"
                          name="replace"
                          type="radio"
                        ></Input>
                        <span className="form-check-sign"></span>
                  Replace
                </Label>
                    </Col>
                    <Col lg="2">
                      <Label check>
                        <Input
                          checked={isSearchChecked}
                          onChange={this.searchChecked}
                          defaultValue="option2"
                          id="search"
                          name="search"
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
                <InputGroup >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-angle-right"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Replace string with..."
                    type="text"
                    onChange={this.handleReplaceKeyword}
                  ></Input>
                </InputGroup>
              </Col>
              <Col lg="11" sm="6">
                <InputGroup >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-angle-right"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Test the regex here with keywords"
                    type="text"
                    onChange={this.handleTestingKeywords}
                  ></Input>
                </InputGroup>
              </Col>
              <Col lg="1" sm="2">
                <Button onClick={this.testKeywords} className="btn-round" type="button" color="info" style={{ margin: 0 }}>
                  Check
              </Button>
              </Col>
            </Row>
            <br></br>
            <Row className="text-center mt-5">
              <Col className="ml-auto mr-auto" md="12">
                {testResult[0].keyword && testResult.map((row) => (
                  <div style={{ paddingLeft: '10px' }}>
                    <h3 style={{color:'grey'}}>KeyWord: {row.keyword}</h3>
                    <h3 style={{color:'grey'}}>Test Value: {row.eq === true ? 'true' : row.eq}</h3>
                  </div>
                ))}
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
    )
  }
}

export default GetStarted;
