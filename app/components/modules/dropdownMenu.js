import { useState } from 'react';
import {Link, useNavigate} from "@remix-run/react";



export default function Catalog({
    catalogClose,
    categories
    }) {
    const [item, setItem] = useState('');
    const navigate = useNavigate();
    const handleItem = (e) => {
        const category = e.target.value
        console.log('handleItem')
        category && setItem(category);
    }
    
    const handleClose = () => {
        console.log('handleClose')
        setItem('');
        catalogClose();
    }

    const handleClick = (e) => {
        navigate(`/Каталог/${e.target.value}`, { replace: true });
    }


    const Category = categories.map((category = {}, key) => {
        const subCatMargin = key * -15;
        return category.parentId===0 && (
            <div key={key} style={{marginLeft: '30px',position:'relative', display: 'flex'}}>
                <button
                    className='catMenu'
                    value={category.category}
                    onMouseOver={handleItem}
                    onClick={handleClick} 
                    style={{
                        backgroundColor: item === category.category ? '#edf0f6' : 'transparent'
                    }}>
                    {category.category.replace(/_/g, ' ')}
                    <span value={category.category} style={{paddingLeft:'20px', justifySelf:'flex-end'}} >▶ &nbsp;</span>
                </button>
                <div style={{
                    background:'white',
                    border:'none', 
                    position:'absolute', 
                    left:260, 
                    top: `${subCatMargin}px`, 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    display: item === category.category ? 'flex' : 'none', 
                    zIndex: 99
                }}>
                    {categories.map((subCat = {}, key) => {
                        return subCat.parentId===category.id && (
                        <button key={key} value={category.category + '/' + subCat.category} className='submenu' onClick={handleClick} >
                            {subCat.category.replace(/_/g, ' ')}
                        </button>
                        )
                    })}
                </div>
            </div>
        )})



    return (
        <div onMouseLeave={handleClose} style={{

            position: 'absolute',
            top: '50px',
            border: '1px solid #edf0f6',
            borderTop: 'none',
            paddingLeft: '0',
            height: '270px',
            width: '100%',
            zIndex: '99',
            background: 'white',
        }}>
            <Link to="/Каталог/"><div style={{
                display: 'flex',
                position: 'absolute',
                zIndex: '100',
                top: '-50px',
                left: '-1px',  
                minWidth: '180px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                color: 'black',
                backgroundColor: 'white',
                borderTop: '1px solid #edf0f6',
                borderLeft: '1px solid #edf0f6',
            }}>
                КАТАЛОГ
                &nbsp;
                <span style={{ fontSize: '8px' }}>
                    ▶
                </span>
            </div></Link>
            <div style={{ marginTop: '15px', display: 'flex' }}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {Category}
                </div>
            </div>
        </div>
    )
}