import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CatalogMenu({category, catalog}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleExpand = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

<>
      <Button
        id="basic-button"
        className='category'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onMouseOver={handleExpand}
      >
        {category.category.replace(/_/g, ' ')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{sx: {boxShadow: 'none'}}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
           
        }}
      >
        {catalog.map((subCategory, key)=> {
          return subCategory.parentId === category.id && (
            <MenuItem onClick={handleClose}>
              {subCategory.category.replace(/_/g, ' ')}
            </MenuItem>
          )
        })}
      </Menu>
</>


  );
}