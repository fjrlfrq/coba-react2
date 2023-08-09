import React, { useCallback, useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux'
import {
    create,
    resetSearch,
    searchUserAsync,
} from '../reducers/users';

export default function UserForm(props) {

    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    const handleSearch = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUserAsync({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const cancelSearch = () => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }

    return (
        <form onSubmit={props.submitLabel ? handleSearch : handleSubmit}>
            <div className="row g-1 align-items-center">
                <div className="col-auto">
                    <label
                        htmlFor="name"
                        className="col-form-label">
                        <strong>Name</strong>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        type="teks"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.name}
                        ref={inputRef}
                    />
                </div>

                <div className="col-auto">
                    <label
                        htmlFor="phone"
                        className="col-form-label">
                        <strong>Phone</strong>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        type="teks"
                        id="phone"
                        name="phone"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.phone}
                    />
                </div>

                <div className="col-auto">
                    <button type="submit" className="btn btn-info" >
                        {props.submitLabel !== "search" &&
                            <i className="bi bi-search"></i>
                        }
                        {props.submitLabel === "search" &&
                            <i className="bi bi-search"></i>
                        }
                        &nbsp;
                        {props.submitLabel || "save"} </button>
                    &nbsp;
                    {props.submitLabel !== "search" &&
                        <button type="submit"
                            onClick={props.cancel}
                            className="btn btn-warning"
                            style={{ color: "black" }}>
                            <i className="bi bi-x-circle-fill"></i>
                            &nbsp;
                            cancel</button>
                    }
                    {props.submitLabel === "search" &&
                        <button type="submit"
                            onClick={cancelSearch}
                            className="btn btn-warning"
                            style={{ color: "black" }}>
                            <i className="bi bi-x-circle-fill"></i>
                            &nbsp;
                            cancel</button>
                    }

                </div>
            </div>
        </form>
    )
}
