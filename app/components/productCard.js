import { useState } from "react";
import {
  Button,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Bullits from '~/components/bullits';
import Switch from '~/components/switch';
import Filter from '~/assets/PNG/filter.png';
import dino from '~/assets/PNG/dino.png';
import { Link } from "@remix-run/react";

const psvTheme = createTheme({
  components: {
      MuiAccordionSummary: {
          styleOverrides: {
              root: {
                  cursor: "default",
                  "&:hover": {
                      cursor: "default"
                  }
              },
              content: {
                  alignItems: 'center',
                  minHeight: '48px',
                  cursor: "default",
                  "&:hover": {
                      cursor: "default"
                  }
              }
          }
      }
  }
});


export default function ProductCard({data}) {

    const HiddenConent = ({ content }) => {
      const [showMore, setShowMore] = useState(false);
      const handleShowMore = () => {
          setShowMore(!showMore);
          !showMore && setTimeout(() => { window.scrollTo({ top: (document.body.scrollHeight / 2), behavior: 'smooth' }) }, 50)
          !showMore && setTimeout(() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }, 250)
      }
  
      return (
          <ThemeProvider theme={psvTheme}>
              <MuiAccordion disableGutters={true} square sx={{ margin: 0, padding: 0, boxShadow: 'none', background: 'transparent', cursor: 'default' }}>
                  <MuiAccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={handleShowMore}
                      sx={{ width: 'auto', padding: 0, margin: 0, height: '25px', }}
                  >
                      <Typography sx={{ color: '#ff6429', borderBottom: '1px dotted #ccc', cursor: 'pointer', lineHeight: 1, '&:hover': { color: '#555', borderBottom: '1px dotted #ff6429' } }}>{showMore ? 'cкрыть' : 'больше информации'}</Typography>
                  </MuiAccordionSummary>
                  <MuiAccordionDetails sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  none
                  </MuiAccordionDetails>
              </MuiAccordion>
          </ThemeProvider>
      )
    }
    const search = (inputArray, id) => {
      console.log('search')
      for (let i = 0; i < inputArray.length; i++) {
          if (inputArray[i].productId === id) {
              console.log('search done')
              return [inputArray[i], i];
          }
      } console.log('search void')
      return [false, false];
    }
    const addToCart = (event, itemData) => {
      console.log('addToCart')
      let data = []
      if (localStorage.getItem('products')) {
          data = JSON.parse(localStorage.getItem('products'));
      }
      const id = event.target.value;

      let [item, key] = search(data, id)
      console.log(itemData)
  
      if (data.length === 0) {
          data.push({ productId: id, qty: 1, data: itemData })
      } else if (item === false) {
          data.push({ productId: id, qty: 1, data: itemData })
      } else if (item.productId === id) {
          console.log(data[key].qty)
          data[key].qty = isNaN(data[key].qty) ? (1) : (data[key].qty + 1);
      }

      //setCartItems(data);
      localStorage.setItem('products', JSON.stringify(data));
    }
      return (
        <>
          <Bullits/>
  
          <h1>Каталог</h1>
  
          <div style={{ marginTop: '0', marginLeft: '-55px', marginRight: '-55px', backgroundColor: '#edf0f6', }}>
              <div style={{
                  position: 'relative', zIndex: 50, padding: '30px', display: 'flex', justifySelf: 'flex-start', flexDirection: 'column',
                  backgroundImage: `url(${dino})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'top right'
              }}>

                  <div className='row' style={{ justifyContent: 'center', background: `url(${Filter})`, backgroundSize: '150%' }}>
                      <div style={{
                          minWidth: '80%',
                          width: '600px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                      }}>
                        {data.product?<>
                          <div style={{ width: '100%', display: 'flex' }}>
                              <span style={{ position: 'relative', zIndex: 50, fontSize: '38px', fontWeight: 600 }}> {data.product.title}  </span>
                          </div>
                          <div className='row' style={{ justifySelf: 'flex-start', width: '100%' }}>
                              {data.product.filter !== 'none' && <Switch
                                  left="Без возвратной пружины"
                                  color="warning"
                                  right="С возвратной пружиной"
                                  callback=""
                              />}
                          </div>
                          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                              <span 
                              style={{ textAlign: 'left', marginTop: '15px', width: '600px', fontSize: '16px', fontWeight: 400 }}
                              dangerouslySetInnerHTML={{ __html: data.product.content }} />
                              {data.product.hidden !== 'none' ? <HiddenConent content={data.product.hidden}/> : <div style={{marginTop: '20px'}}/>}
                              <Button value={data.product.name} onClick={(e) => addToCart(e, {picture: data.prduct.picture, title: data.product.title})} sx={{ alignSelf: "flex-start", width: '180px', height: '35px', fontFamily: 'Roboto', fontWeight: 400, fontSize: '.75rem', borderRadius: 0, color: 'white', backgroundColor: '#ff6429', '&:hover': { backgroundColor: '#d67f06' } }}>добавить в корзину</Button>
                          </div>
                          </>:<>
                          <div style={{ width: '100%', display: 'flex' }}>
                              <span style={{ position: 'relative', zIndex: 50, fontSize: '38px', fontWeight: 400 }}> Товар не найден :( </span>
                          </div>
                          <div className="notFound" style={{backgroundImage: `url(${dino})`}}/>
                          </>}
                          
                      </div>
                  </div>
              </div>
          </div>
          <div style={{display:'flex', justifyContent: 'center'}}>
          <div style={{ minWidth: '80%',width: '600px', display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '-55px'}}>
                          <div style={{ maxWidth: 'max-content', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                          {data.products.map((item, index) => (
                                <div key={index} style={{borderTop: '1px solid #edf0f6', borderBottom: '1px solid #edf0f6',display: 'flex', alignItems: 'center', justifyContent:'space-between', marginTop: '-1px'}}>
                                    <div style={{float: 'left', fontWeight: 400}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{width: '50px', height:'50px',backgroundImage: `url(${dino})`, backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}/>
                                            <div style={{width: 'max-content', marginLeft: '20px'}}>
                                            
                                                <Link to={'/catalog/' + (('categoryId' in data.params) ? data.params.categoryId + '/' : '') + (('subCategoryId' in data.params && data.params.subCategoryId !== data.product.name) ? data.params.subCategoryId + '/' : '') + item.name}> {item.title} </Link>
                                            </div>
                                        </div> 
                                    </div>
                                    <div style={{float: 'right', marginLeft:'40px', marginRight:'40px'}}>
                                        <Button onClick={(e) => addToCart(e, {picture: data.product.picture, title: data.product.title})} size="small" sx={{color: 'white', backgroundColor: '#006efb', '&:hover': {backgroundColor: '#0056c5'}}}><AddShoppingCartOutlinedIcon fontSize="small"/></Button>
                                    </div>
                                </div>
                            )
                          )}
                          </div>
                          </div>
                          </div>
        </>
      );
    }