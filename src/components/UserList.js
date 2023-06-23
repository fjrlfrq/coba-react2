import UserItem from "./UserItem"

export default function UserList(props) {
    console.log(props)
    return (
        <table className="table table-striped">
            <thead>
                <th>No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {props.data.map((user, index) => (
                    <UserItem no={index + 1} name={user.name} phone={user.phone} />
                ))}
            </tbody>
        </table>
    )
}