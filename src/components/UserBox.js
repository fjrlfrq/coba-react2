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
                console.log(data)
                this.setState({ users: data.data })
            })
    }

    addUser = (name, phone) => {
        this.setState(function (state, props) {
            return {
                users: [
                    ...state.users,
                    {
                        name,
                        phone
                    }
                ]
            }
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
                        <UserForm add={this.addUser} />
                    </div>
                    <UserList data={this.state.users} />
                    <div className="card-footer">

                    </div>
                </div>
            </div>

        )
    }
}