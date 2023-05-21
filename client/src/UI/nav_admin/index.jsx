import { Nav } from 'rsuite';

const NavAdmin = ({ active, onSelect,...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 50 , background: '#191615'}}>
            <Nav.Item eventKey="genres">Категории</Nav.Item>
            <Nav.Item eventKey="types">Типы печати</Nav.Item>
            <Nav.Item eventKey="format">Формат печати</Nav.Item>
            <Nav.Item eventKey="city">Магазины</Nav.Item>
            <Nav.Item eventKey="roles">Роли</Nav.Item>
        </Nav>
    );
};

export default NavAdmin