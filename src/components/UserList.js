import UserItem from "./UserItem"

export default function UserList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((user, index) => (
                    <UserItem
                        key={index}
                        id={user._id}
                        no={index + 1}
                        user={user}
                        remove={() => props.remove(user.id)}
                        resend={() => props.resend(user)}
                        update={() => props.update}
                    />
                ))}
            </tbody>
        </table>
    )
}