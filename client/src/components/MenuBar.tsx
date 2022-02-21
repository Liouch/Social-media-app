import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  let path =
    location.pathname === '/' ? 'home' : location.pathname.substring(1);
  const [activeItem, setActiveItem] = React.useState<string | undefined>(path);

  const handleItemClick = (name: string | undefined) => {
    setActiveItem(name);
  };

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.username} active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={(_, data) => handleItemClick(data.name)}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={(_, data) => handleItemClick(data.name)}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={(_, data) => handleItemClick(data.name)}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
