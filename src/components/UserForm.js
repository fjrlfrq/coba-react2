import { Component } from "react";

export default class UserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit({name: this.state.name, phone: this.state.phone})
        this.setState({name: '', phone: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" name="name" placeholder="name" onChange={this.handleInputChange} value={this.state.name}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="phone" name="phone" placeholder="phone" onChange={this.handleInputChange} value={this.state.phone}></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"><i className="bi bi-plus-lg">Add</i></button>
            </form>
        )
    }
}
