import { useState } from 'react';
import {Link, useNavigate} from "@remix-run/react";
import { Fade } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

export default function CatalogMenu({category, catalog}) {
    const category = value.category
        const id = value.id
        const parent = value.parentId
        return (<>
        <Link to={'/catalog/'+ category} replace={true}>
            <button value={category} onMouseOver={handleItem} onMouseLeave={clearItem} key={key} className='category'>
                <SettingsIcon value={category} onMouseOver={handleItem} sx={{color:"#555"}} fontSize='large'/>
                <div value={category} onMouseOver={handleItem} className='categoryName'> 
                    {category} 
                </div>
                                    <div className='subCatSelector column' style={{
                        display: (category === item)?'flex':'none'
                    }}>
                <Fade in={displaySubCat}>

                        {catalog.map((subCat = {}, key) => {
                            const title = subCat.category
                            const subCatId = subCat.id
                            const subCatParent = subCat.parentId
                                                return subCatParent===id?(
                                                    <Link to={'/catalog/'+ category + '/' + title} replace={true}>
                                                    <button className='subCategory'>
                                                        <div className='subCategory-helper'/>
                                                        {title}
                                                        {console.log(id, parent, subCatId, subCatParent)}
                                                    </button>
                                                    </Link>
                                                ):(null)
                                            })
                                        }
       
                    <div style={{position:'absolute',width:'100%',height:'35px', bottom:'-30px', backgroundColor: 'rgba(255,255,255,.005)'}}/>
                </Fade>             </div>
            </button>
        </Link>
        </>)
}