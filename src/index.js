import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import {
    Alert, Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

  class Login extends React.Component{
    render() {
        return (
          <Container className="Login">
            <h2>{this.props.signup ? "Sign Up" : "Login"}</h2>
            <Form  id="form" className="form">
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
              <Button onClick={this.props.onClickSubmitSignUp}>Submit</Button>
            </Form>
            {!this.props.signup && 
                <div> 
                    <br></br>
                    <p style={{display: 'inline'}}>Don't have an account? Please click to sign in</p>
                    <Button onClick={this.props.onClick}  color="link">HERE</Button>
                </div>
            }
            {this.props.signup && 
                <div> 
                    <br></br>
                    <p style={{display: 'inline'}}>Have already an account?</p>
                    <Button onClick={this.props.onClick}  color="link">Go to login</Button>
                </div>
            }
            {this.props.created && 
                <div> 
                    <br></br>
                    <Alert color="success">
                         Account "{this.props.username}"" created successfully! Try to log in
                    </Alert>
                </div>
            }
            {this.props.repeatedUsername && 
                <div> 
                    <br></br>
                    <Alert color="danger">
                         The username is already in use
                    </Alert>
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
            created: false,
            repeatedUsername: false,
            username: null,
        };
    }

    handleClick = () => {
        this.setState(
            {signup: !this.state.signup,
            created: false,
            repeatedUsername: false}
        );
    }
    
    handleClickSubmitSignUp = () => {
        $(document).ready( () => {
            $.ajax( {
                context: this,
                url:'https://scary-vampire-95646.herokuapp.com/api/user/signup',
                type:'post',
                data:$('#form').serialize(),
                statusCode: {
                    200: (response) => {
                        this.setState(
                            {signup: false,
                            created: true,
                            repeatedUsername: false,
                            username: response['user']['username']}
                        );
                    },
                    500: () => {
                        this.setState(
                            {signup: true,
                            created: false,
                            repeatedUsername: true}
                        );
                    }
                  }
                
            });
        });
        
    }
    

    render(){
        return(
             <div className="App">
                <Login onClick={this.handleClick} signup={this.state.signup} 
                    onClickSubmitSignUp={this.handleClickSubmitSignUp}
                    created={this.state.created} 
                    repeatedUsername={this.state.repeatedUsername}
                    username= {this.state.username} />
            </div>
        );
        
        
    }
    
    
  }
  
// ========================================
  
ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );