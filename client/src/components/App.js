import React, { Component } from 'react';
import axios from 'axios';
import { 
        MDBDataTable,
        MDBBtn,
        MDBModal,
        MDBContainer,
        MDBModalBody,
        MDBModalHeader,
        MDBInput,
        MDBModalFooter
} from 'mdbreact';

const api_url = 'http://localhost:3000/api'

class App extends Component {
    state = {
        modal1: false,
        person_frm: [
            {
                email: '',
                first_name: '',
                last_name: '',
            }
        ],
        txnType: '',
        persons_table: {
            columns: [
                {
                    label: 'email',
                    field: 'email',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'First Name',
                    field: 'first_name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Last Name',
                    field: 'last_name',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Handle',
                    field: 'handle',
                    sort: 'asc'
                }
            ],
            rows: []
        }
    }

    componentDidMount() {
        axios.get(`${api_url}/people`)
        .then(res => {
            const persons = res.data;
            let person_data = persons.map(person => (
                {
                    email: person.email,
                    first_name: person.first_name,
                    last_name: person.last_name,
                    handle: <div className='text-center'><MDBBtn onClick={this.handleClick(person)} color="blue" size="sm">Edit</MDBBtn></div>,
                    // clickEvent: e => this.handleClick(e, person_data)
                }
            ));

            console.log(person_data);
           
            this.setState({
                persons_table: {
                      ...this.state.persons_table,
                      rows: person_data
                }
            })
        })
        .then( () => {
            console.log(this.state.persons_table);
        })
    }

    handleClick = (data) => () => {
        console.log('data:', data);
        this.setState({ person_frm: data, txnType: 'Update' });
        this.toggleViaDt(1);
    }

    handleChange (e) {
        console.log(e.target.name);
        const inputname = e.target.name;
        const inputvalue = e.target.value;
        this.setState({
            person_frm: {
                  ...this.state.person_frm,
                  [inputname] : inputvalue
            }
        });
        // console.log(this.state.person_frm);
    }

    toggleViaDt = nr  => { //toggle in method
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
    }

    toggle = nr => () => { //toggle in jsx
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
    }

    addPerson = () => {
        this.setState({ txnType: 'Create' });
        this.toggleViaDt(1);
    }

    savePerson = () => {
        const person_frm = this.state.person_frm;
        console.log(person_frm);
        axios.post(`${api_url}/people`, person_frm)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <h1>MySQL + Express + React + Node CRUD</h1>
                <MDBBtn onClick={this.addPerson} color="green" size="sm">Add</MDBBtn>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    small
                    data={this.state.persons_table}
                />
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)}>
                    <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold" toggle={this.toggle(1)}>{this.state.txnType} People</MDBModalHeader>
                    <MDBModalBody>
                        <form className="mx-3 grey-text">
                            <MDBInput label="Type your Email" name="email" onChange={(e) => {this.handleChange(e)}} value={this.state.person_frm.email} icon="envelope" group type="email" validate error="wrong" success="right" />
                            <MDBInput label="Type your First Name" name="first_name" onChange={(e) => {this.handleChange(e)}} value={this.state.person_frm.first_name} icon="user" group type="text" validate />
                            <MDBInput label="Type your Last Name" name="last_name" onChange={(e) => {this.handleChange(e)}} value={this.state.person_frm.last_name} icon="user" group type="text" validate />
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn onClick={this.savePerson}>Save</MDBBtn>
                    </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}

export default App;