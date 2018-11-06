import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            username: '',
            usernameForAlert: '',
            password: '',
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    handleClick = () => {
        this.setState(
            {signup: !this.state.signup,
            created: false,
            repeatedUsername: false}
        );
    }
    
    handleClickSubmitSignUp = () => {
        var data = {'username':this.state.username,
                    'password' : this.state.password,
                     }
        fetch('https://scary-vampire-95646.herokuapp.com/api/user/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), 
        }).then((response) => {
                if(response.status === 200) {
                    this.setState(
                        {signup: false,
                        created: true,
                        repeatedUsername: false,
                        usernameForAlert: this.state.username, 
                        username: '',
                        password: ''}
                    );
                }else{
                    this.setState(
                        {signup: true,
                        created: false,
                        repeatedUsername: true,
                        username: '',
                        password: ''}
                    )
                }
                
            })
        
    }
    

    render(){
        return(
             <div className="App">
                <Login onClick={this.handleClick} signup={this.state.signup} 
                    onClickSubmitSignUp={this.handleClickSubmitSignUp}
                    onChangeForm={this.handleChange}
                    created={this.state.created} 
                    repeatedUsername={this.state.repeatedUsername}
                    username= {this.state.username}
                    password= {this.state.password}
                    usernameForAlert = {this.state.usernameForAlert} />
            </div>
        );
        
        
    }
    
    
  }
  
// ========================================
  
ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );