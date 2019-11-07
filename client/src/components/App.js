import React, { Component } from 'react';
import axios from 'axios';
import Alert from './Alert';

import { 
        MDBDataTable,
        MDBBtn,
        MDBModal,
        MDBContainer,
        MDBModalBody,
        MDBModalHeader,
        MDBInput,
        MDBModalFooter,
        MDBRow,
        MDBIcon 
} from 'mdbreact';

const api_url = '/api'

const TableAction = ({ handleClick, person }) => {
    return(
        <div className='text-center'>
            <MDBBtn onClick={handleClick(person,'Update')} color="blue" size="sm">Edit</MDBBtn>
            <MDBBtn onClick={handleClick(person,'Delete')} color="red" size="sm">Delete</MDBBtn>
        </div>
    )
}

class App extends Component {
    state = {
        modal1: false,
        modal2: false,
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
        this.loadData();
    }

    loadData = () => {
        axios.get(`${api_url}/people`)
        .then(res => {
            const persons = res.data;
            this.addActionMapper(persons);
        })
        .then( () => {
            console.log(this.state.persons_table);
        })
    }

    handleClick = (data, txnType) => () => {
        // console.log('data:', data);
        this.setState({ person_frm: data, txnType });
        if(txnType==="Delete") {
            this.toggleViaDt(2);
            return;
        }
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

    addActionMapper = (persons) => {
        let person_response = persons.map(person => (
            {
                id: person.id,
                email: person.email,
                first_name: person.first_name,
                last_name: person.last_name,
                handle: <TableAction handleClick={this.handleClick} person={person} />,
                // clickEvent: e => this.handleClick(e, person_data)
            }
        ));

        const person_data = this.state.persons_table.rows.concat(person_response);
        this.setState({
            persons_table: {
                ...this.state.persons_table,
                rows: person_data
            }
        });
    }

    savePerson = () => {
        const person_frm = this.state.person_frm;
        const txnType = this.state.txnType;
        if(txnType === "Create"){
            axios.post(`${api_url}/people`, person_frm)
            .then(res => {
                console.log(res.status);
                console.log(res.data[0]);
                const persons = res.data;
                this.toggleViaDt(1);
                this.addActionMapper(persons);
            })
            .catch(error => {
                console.log(error.message)
            });
        }
        else if(txnType === "Update"){
            axios.put(`${api_url}/people/`, person_frm)
            .then(res => {
                // console.log(res.status);
                // console.log(res.data);
                this.toggleViaDt(1);
                const person_data = this.state.persons_table.rows;
                person_data.filter( (f) => {
                    if(f.id == res.data[0].id) {
                        const person = {
                            id: res.data[0].id,
                            email: res.data[0].email,
                            first_name: res.data[0].first_name,
                            last_name: res.data[0].last_name
                        };
                        f.email = res.data[0].email,
                        f.first_name = res.data[0].first_name,
                        f.last_name = res.data[0].last_name,
                        f.handle =  <TableAction handleClick={this.handleClick} person={person} />
                    } else{
                        return f;
                    }
                }); // create entirely new array of only items who dont match the param i.d
                this.setState({
                    persons_table: {
                        ...this.state.persons_table,
                        rows: person_data
                    }
                });
            })
            .catch(error => {
                console.log(error.message)
            });
        }
        else if(txnType === "Delete"){
            axios.delete(`${api_url}/people/${person_frm.id}`)
            .then(res => {
                // console.log(res.status);
                // console.log(res.data);
                this.toggleViaDt(2);
                const person_data = this.state.persons_table.rows.filter( f => f.id != person_frm.id ); // create entirely new array of only items who dont match the param i.d
                this.setState({
                    persons_table: {
                        ...this.state.persons_table,
                        rows: person_data
                    }
                });
            })
            .catch(error => {
                console.log(error.message)
            });
        }
        
    }

    render() {
        return (
            <div className='container'>
                <Alert />
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

                <MDBContainer>
                    <MDBModal position="top" backdrop={false} frame isOpen={this.state.modal2} toggle={this.toggle(2)}>
                    <MDBModalBody>
                        <MDBRow className="justify-content-center align-items-center">
                        <p className="pt-3 pr-2">Are you sure you want to remove this data?</p>
                        <MDBBtn color="red" onClick={this.savePerson}>Yes
                        </MDBBtn>
                        <MDBBtn color="primary" outline onClick={this.toggle(2)}>No</MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}

export default App;