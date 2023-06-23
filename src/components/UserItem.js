export default function UserItem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>
                <button type="button" className="btn btn-warning"><i className="bi bi-pencil-fill">edit</i></button>
                <button type="button" className="btn btn-danger">delete</button>
            </td>
        </tr>
    )
}