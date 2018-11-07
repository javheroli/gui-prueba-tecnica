import React from 'react';
import Login from './Login.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            signup: false,
            created: false,
            repeatedUsername: false,
            errorLogin: false,
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
            repeatedUsername: false,
            username: '',
            password: ''}
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
                        errorLogin: false,
                        username: '',
                        password: ''}
                    );
                }else{
                    this.setState(
                        {signup: true,
                        created: false,
                        repeatedUsername: true,
                        errorLogin: false,
                        username: '',
                        password: ''}
                    )
                }
                
            })
        
    }

    handleClickSubmitLogIn = () => {
        var data = {'username':this.state.username,
                    'password' : this.state.password,
                     }
        fetch('https://scary-vampire-95646.herokuapp.com/api/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), 
        }).then((response) => {
                if(response.status === 200) {
                    response.json().then((responseData) => {
                        this.setState(
                            {token: responseData['token'],
                            signup: null,
                            created: null,
                            repeatedUsername: false,
                            errorLogin: false,
                            usernameForAlert: this.state.username, 
                            username: '',
                            password: ''}
                        );
                    });
                    
                }else{
                    this.setState(
                        {signup: false,
                        created: false,
                        repeatedUsername: false,
                        errorLogin: true,
                        username: '',
                        password: ''}
                    )
                }
                
            })
        
    }
    

    render(){
        return(
            <div className="App">
            {this.state.token === null && 
                    <Login onClick={this.handleClick} signup={this.state.signup} 
                        onClickSubmitSignUp={this.handleClickSubmitSignUp}
                        onClickSubmitLogIn={this.handleClickSubmitLogIn}
                        onChangeForm={this.handleChange}
                        created={this.state.created} 
                        repeatedUsername={this.state.repeatedUsername}
                        username= {this.state.username}
                        password= {this.state.password}
                        usernameForAlert = {this.state.usernameForAlert}
                        errorLogin = {this.state.errorLogin} />
            }
            {
                this.state.token !== null &&  
                    <p>{this.state.token}</p> 
            }
            </div>
        );
        
        
    }
    
    
  }

  export default App;