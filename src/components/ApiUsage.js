import React from 'react';
import { Collapse, Button, CardBody, Card, Table, Input } from 'reactstrap';
import './index.css'
import JSONPretty from 'react-json-pretty';



class ApiUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false, tryitout: false,
      response: false, responseCode: null, responseDetails: null, responseHeaders: null,
      _id: '',
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
}

  toggle = () => {
    this.setState({ collapse: !this.state.collapse, 
     response: false,tryitout: false, responseCode: null, responseDetails: null, responseHeaders: null});
  }

  tryitout = () => {
    this.setState({ tryitout: !this.state.tryitout });
  }

  handleClickExecute = () => {
    var uri = this.props.uri;
    if(this.props.needId){
      uri+=this.state._id;
    }
    fetch(uri, {
      method: this.props.method,
      headers: new Headers( {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + this.props.token
      })
      //body: JSON.stringify(data), 
    }).then((res) => {
      this.setState({
        responseCode: res['status'],
        responseHeaders: res['headers'],
      })
      return res.json()
    })
    .then((response) => {
      this.setState(
        {
          response: true,
          responseDetails: JSON.stringify(response),
          
        }
      );
    });




  }



  render() {
    return (
      <div>
        <Card className="Card" style={{ height: '4em', padding: '0px', borderColor: this.props.borderColor, }}>
          <CardBody style={{ padding: '0.70rem', paddingTop: '10px' }} onClick={this.toggle}>
            <Button color={this.props.buttonColor} onClick={this.toggle} style={{ marginBottom: '1rem', width: '10%' }}>{this.props.method}</Button>
            <span style={{ fontWeight: "600", marginLeft: "2%", fontSize: '16px', fontFamily: 'monospace' }}>{this.props.pathTitle}</span>
            <div style={{ flex: '1', fontFamily: 'sans-serif', color: '#3b4151', display: 'inline', marginLeft: '2%', fontSize: '13px' }}>{this.props.description}</div>
          </CardBody>
        </Card>

        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Table>
                <tbody>
                  <tr>
                    <td colSpan="2">{this.props.descriptionExtended}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      Parameters
                    {!this.state.tryitout &&
                        <Button color="warning" onClick={this.tryitout} style={{ marginLeft: '75%' }}>Try it out</Button>
                      }
                      {this.state.tryitout &&
                        <Button color="danger" onClick={this.tryitout} style={{ marginLeft: '75%' }}>Cancel</Button>
                      }

                    </td>
                  </tr>
                  <tr style={{ borderBottomWidth: '2px', borderBottomStyle: 'solid' }}>
                    <th >
                      Name
                  </th>
                    <th>Description</th>
                  </tr>
                  {this.props.pathTitle === '/api/companies' &&
                    <tr>
                      <td colSpan="2">There are no parameters for this method</td>
                    </tr>
                  }
                  {
                    this.props.needId &&
                      <tr>
                        <td>
                          <strong style={{marginLeft: '3%'}}>id</strong>
                          <p>(Type: String)</p>

                        </td>
                        <td>
                          <p>Introduce the _id property value of the company to retrieve</p>
                          <Input
                            type="text"
                            name="_id"
                            id="_id"
                            onChange={this.handleChange}
                            placeholder="e.g: 52cdef7c4bab8bd675297d8b"
                            value={this.state._id}
                  />
                        </td>
                      </tr>
                  }
                  {//Añadir a partir de aquí el parámetro body distinguiendo que no sea el get de todas las compañias 
                  }
                  {this.state.tryitout &&
                    <tr>
                      <td colSpan="2">
                        <Button onClick={this.handleClickExecute} color="primary" style={{ width: '100%', textAlign: 'center', }}>Execute</Button>
                      </td>
                    </tr>

                  }
                  {this.state.response &&
                    <tr>
                      <td colSpan="2">
                        Server Response
                    </td>

                    </tr>}
                  {this.state.response &&
                    <tr style={{ borderBottomWidth: '2px', borderBottomStyle: 'solid' }}>
                      <th >
                        Code
                    </th>
                      <th>Details</th>
                    </tr>}
                  {this.state.response &&
                    <tr>
                      <td>
                      {this.state.responseCode}
                    </td>
                      <td>
                        <p>Response body</p>
                        <div className="DivWithScroll">
                          <div className="DivToScroll">
                          <JSONPretty style={{color: "white"}} id="json-pretty" json={this.state.responseDetails}></JSONPretty>
                          
                        </div>

                        </div>
                        <br></br>
                        <p>Response headers</p>
                        <div style={{ paddingTop: '5px', borderRadius: '2px', height: '33px', backgroundColor: '#41444e', color: 'white' }}>
                          <div style={{ marginLeft: '3%', }}>
                            
                              {this.state.responseHeaders}
                            
                        </div>

                        </div>

                      </td>
                    </tr>
                  }

                </tbody>
              </Table>

            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default ApiUsage;