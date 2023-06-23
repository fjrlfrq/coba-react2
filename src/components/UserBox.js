import { Component } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    users: data.data.map(item => {
                        item.sent = true
                        return item
                    })
                })
            })
    }

    addUser = ({ name, phone }) => {
        const _id = Date.now().toString()
        this.setState(function (state, props) {
            return {
                 users: [
                    ...state.users,
                    {
                        _id,
                        name,
                        phone,
                        sent: true
                    }
                ]
            }
        })
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.map(item => {
                            if (item._id === _id) {
                                return {
                                    _id: data.data.id,
                                    name: data.data.name,
                                    phone: data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                    }
                })
            })
            .catch((error) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.map(item => {
                            if (item._id === _id) {
                                return {
                                    ...item,
                                    sent: false
                                }
                            }
                            return item
                        })
                    }
                })
            })
    }

    removeUser = (_id) => {
        console.log(_id)
        fetch(`http://localhost:3000/users/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((data) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.filter(item => item._id !== data.data._id)
                    }
                })
            })
    }

    searchUser = (query = {}) => {
        fetch(`http://localhost:3000/users?${new URLSearchParams(query)}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ users: data.data })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1>Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        <UserForm submit={this.addUser} />
                    </div>
                    <UserList data={this.state.users} remove={this.removeUser} />
                    <div className="card-footer">

                    </div>
                </div>
            </div>

        )
    }
}