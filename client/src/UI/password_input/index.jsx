import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import React from 'react';

const PasswordInput = ({...props}) => {
    const [visible, setVisible] = React.useState(false);
    const handleChange = () => {
        setVisible(!visible);
    };

    return (
        <InputGroup inside>
            <Input type={visible ? 'text' : 'password'} value={props.value} onChange={e => props.change(e)} {...props}/>
            <InputGroup.Button onClick={handleChange} style={{margin: '0px'}}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
        </InputGroup>
    );
}

export default PasswordInput