import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  const [activeItem, setActiveItem] = React.useState<string | undefined>(
    'home'
  );

  const handleItemClick = (name: string | undefined) => {
    setActiveItem(name);
  };

  return (
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
};

export default MenuBar;
