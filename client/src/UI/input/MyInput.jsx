import Input from 'rsuite/Input';

const MyInput = ({change, ...props}) => {
    return(
        <>
            <Input value={props.value} onChange={e => change(e)} {...props}/>
        </>
    )
}

export default MyInput