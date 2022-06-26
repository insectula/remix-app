import { useState } from 'react';
import {Link, useNavigate} from "@remix-run/react";
import { Fade } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

export default function CatalogMenu({categories}) {
    const [displaySubCat, setDisplaySubCat] = useState(false);
    const [item, setItem] = useState('');
    const navigate = useNavigate();


    const handleItem = (e) => {
        const category = e.target.value
        console.log('handleItem')
        category && setItem(category);
    }


    const clearItem = () => {
        console.log('clearItem')
        setItem('');
    }

    const handleClick = (e) => {
        navigate(`/Каталог/${e.target.value}`, { replace: true });
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '0', marginLeft:'-55px', marginRight:'-55px', backgroundColor:'#edf0f6'}}>
            
            <div className="categorySelector">
            {categories.map((category = {}, key) => {
                    return category.parentId===0?(
                        <button value={category} onMouseOver={handleItem} onMouseLeave={clearItem} key={key} className='category'>
                        <SettingsIcon sx={{color:"#555", pointerEvents: 'none'}} fontSize='large'/>
                        <div className='categoryName'> 
                            {category.category.replace(/_/g, ' ')} 
                        </div>
                        <Fade in={item !== ''}><div className='subCatSelector column'>
                            {categories.map((subCategory, key) => {
                                                    return subCategory.parentId===category.id?(
                                                        <button className='subCategory'>
                                                            <div className='subCategory-helper'/>
                                                            {subCategory.category}
                                                        </button>
                                                    ):(null)
                                                })
                                            }
                        </div></Fade>
                        </button>
                    ):(null)
                    
                })
            }
            </div>
        </div>
    )
}