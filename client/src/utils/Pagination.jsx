import MyButtonTwo from "../UI/buttonTwo/MyButtonTwo"

const Pagination = ({...props}) => {
    return(
        <div className="pagination">
            {props.obj != 1 && <MyButtonTwo onClick={() => props.setObj(props.obj - 1)}>&#60;</MyButtonTwo>}
            <div className="page">{props.obj}</div>
            {props.count > props.obj && <MyButtonTwo onClick={() => props.setObj(props.obj + 1)}>&#62;</MyButtonTwo>}
        </div>
    )
}

export default Pagination