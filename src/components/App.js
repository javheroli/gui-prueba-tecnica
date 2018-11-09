import React from 'react';
import Login from './Login.js'
import ApiUsage from './ApiUsage.js'
import { Container } from 'reactstrap';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: this.checkCookie(),
            signup: false,
            created: false,
            repeatedUsername: false,
            errorLogin: false,
            username: '',
            usernameForAlert: '',
            password: '',
        };
    }

    checkCookie = () => {
        var token = document.cookie;
        if(token !== ''){
            return token;
        }else{
            return null;
        }
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
                        document.cookie = responseData['token'];
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
                    <div style={{marginTop: '2%',}} className="divAPI">
                        <Container className="APIContainer">
                            <h1 style={{marginBottom: '2%',}}>Companies API</h1>
                            <div className="description">
                                <p>GUI view which permits accessing to multiple information of a company list (including creation, update and delete) by doing request to 
                                    the API deployed in Heroku.
                                    Both, this view and Restfull Api were developed  as first learning project by Javier Herraiz Olivas on his practice in company period.
                                    GUI developed with React.js
                                    API developed with Node.js, express.js, passport.js using MongoDB as DB storage and deployed with Heroku.
                                </p>
                            </div>
                            <div style={{marginBottom: '2%',}}>
                                Any questions?<br></br>
                                <a href="mailto:javierherraizolivas@gmail.com">Contact the developer</a>
                            </div>
                            <div>
                                <br></br>
                                <h3>Try it yourself</h3>
                                <br></br>
                            </div>
                            <div className="APIUsages_list">
                                <ApiUsage method="GET" borderColor="#007bff" pathTitle="/api/companies"
                                 description="Retrieves all companies in DB"
                                 needId={false}
                                 needBody={false}
                                descriptionExtended="Returns a Json composed of all companies stored in the database, for each company every attributes or fields availables will be displayed"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies"
                                token ={this.state.token}
                                buttonColor="primary"
                                />
                                <br></br>
                                <ApiUsage method="GET" borderColor="#007bff" pathTitle="/api/companies/{:companyId}"
                                 description="Retrieves from DB the company which _id field equals to :companyId"
                                 needId={true}
                                 needBody={false}
                                descriptionExtended="Returns a Json composed of the company stored in the database which _id field equals to the one introduced, for the company every attributes or fields availables will be displayed"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies/"
                                token ={this.state.token}
                                buttonColor="primary"
                                />
                                <br></br>
                                <ApiUsage method="POST" borderColor="#49cc90" pathTitle="/api/companies"
                                 description="Creates a new company and stores in DB"
                                 needId={false}
                                 needBody={true}
                                descriptionExtended="Returns a Json composed of the new company created and stored in database, displaying all fields introduced and its values"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies"
                                token ={this.state.token}
                                buttonColor="success"
                                />
                                 <br></br>
                                <ApiUsage method="PUT" borderColor="#fca130" pathTitle="/api/companies/{:companyId}"
                                 description="Updates all properties from the company stored in DB which _id equals to :companyId"
                                 needId={true}
                                 needBody={true}                                 
                                descriptionExtended="Returns a Json composed of the updated company and stored in database, displaying all fields with its values changed"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies/"
                                token ={this.state.token}
                                buttonColor="warning"
                                />

                                 <br></br>
                                <ApiUsage method="PATCH" borderColor="#fca130" pathTitle="/api/companies/{:companyId}"
                                 description="Updates selected properties from the company stored in DB which _id equals to :companyId"
                                 needId={true}
                                 needBody={true}
                                descriptionExtended="Returns a Json composed of the updated company and stored in database, displaying all fields with its values changed"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies/"
                                token ={this.state.token}
                                buttonColor="warning"
                                />
                                 <br></br>
                                <ApiUsage method="DELETE" borderColor="#f93e3e" pathTitle="/api/companies/{:companyId}"
                                 description="Deletes the company stored in DB which _id equals to :companyId"
                                 needId={true}
                                 needBody={false}
                                descriptionExtended="Returns an 201 No content response code if deletion was done successfully or 500 if something went wrong instead"
                                uri="https://scary-vampire-95646.herokuapp.com/api/companies/"
                                token ={this.state.token}
                                buttonColor="danger"
                                />
                            </div>
                            
                            
                            
                        </Container>
                    </div>
            }
            </div>
        );
        
        
    }
    
    
  }

  export default App;