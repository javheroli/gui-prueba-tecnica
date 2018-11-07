import React from 'react';
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
                    onChange={this.props.onChangeForm}
                    value={this.props.username}
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
                    onChange={this.props.onChangeForm}
                    value= {this.props.password}
                  />
                </FormGroup>
              </Col>
              <Button onClick={this.props.signup ? this.props.onClickSubmitSignUp : this.props.onClickSubmitLogIn}>Submit</Button>
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
                         Account "{this.props.usernameForAlert}" created successfully! Try to log in
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
            {this.props.errorLogin && 
                <div> 
                    <br></br>
                    <Alert color="danger">
                         Error: Unable to Log In
                    </Alert>
                </div>
            }
            
          </Container>
        );
      }
  }

  export default Login;