import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

  class Login extends React.Component{
    render() {
        return (
          <Container className="Login">
            <h2>{this.props.signup ? "Sign Up" : "Login"}</h2>
            <Form method="POST" action={this.props.action} className="form">
              <Col>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                  />
                </FormGroup>
              </Col>
              <Button>Submit</Button>
            </Form>
            {!this.props.signup && 
                <div> 
                    <br></br>
                    <p style={{display: 'inline'}}>Don't have an account? Please click to sign in</p>
                    <Button onClick={this.props.onClick}  color="link">HERE</Button>
                </div>
            }
            
          </Container>
        );
      }
  }

  
  class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            signup: false,
        };
    }

    handleClick = () => this.setState({signup: true});

    render(){
        return(
             <div className="App">
                <Login onClick={this.handleClick} signup={this.state.signup} 
                action={this.state.signup ? "https://scary-vampire-95646.herokuapp.com/api/user/signup" : ""} />
            </div>
        );
        
        
    }
    
    
  }
  
// ========================================
  
ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );