import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from '@remix-run/react';

export default function Menu({catalog}) {
  const [item, setItem] = React.useState('');  // если subcat = item показать
  const navigate = useNavigate();

  const handleItem = (value) => {
    setItem(value)
  }
  const clearItem = () => {
    setItem('')
  }
  const handleClick = (e) => {
    navigate(`/Каталог/${e.target.value}`, { replace: true });
  }
  return (<div className="categorySelector" onMouseLeave={clearItem}>
    {catalog.map((category, key) => {
      return category.parentId===0?(
        <div key={key} style={{position: 'relative'}}>
          <button value={category.category} onMouseOver={() => handleItem(category.category)} onClick={handleClick} className='category'>
                <SettingsIcon sx={{color:"#555", pointerEvents: 'none'}} fontSize='large'/>
                <div className='categoryName'> 
                    {category.category.replace(/_/g, ' ')} 
                </div>
                <div onMouseOver={() => handleItem(category.category)} className='subCategoryHelper'/>
          </button>
          <div className='subCatSelector column' style={{display: (category.category === item)?'flex':'none'}}>
          {catalog.map((subCat = {}, key) => {
                      return subCat.parentId===category.id?(
                          <button key={key} value={category.category + '/' + subCat.category} onMouseOver={() => handleItem(category.category)} onClick={handleClick} className='subCategory'>
                              {subCat.category.replace(/_/g, ' ')}
                          </button>
                      ):(null)
            })
          }
          </div>
        </div>
      ):(null)
    })}
  </div>
  )
}