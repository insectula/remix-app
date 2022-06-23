import { useCallback, useEffect, useState } from 'react';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';
import globalCss from '~/styles/global.css'
import { Container, Col, Row } from "react-bootstrap";
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import CartModal from './components/cartModal';
import Catalog from './components/dropdownMenu';
import FeedbackModal from '~/components/feedbackModal';
import Logo from '~/assets/SVG/logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { prisma } from '~/db';
//import catalog from './routes/catalog';
export const links = () => ([
 // {rel: 'stylesheet', href: bootstrapCss},
  {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'},
  {rel: 'stylesheet', href: globalCss}
])

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async({params}) => {
  
  const catalog = await prisma.catalog.findMany()
  return(catalog)
}


export default function App({data}) {
  const catalog = useLoaderData();
  return(
    <Document>
      <Layout catalog={catalog}>
        <Outlet context={catalog}/>
      </Layout>
    </Document>
  )
}

function Document({children}) {

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function useForceUpdate(){
  const [renders, setRenders] = useState(0);
  return () => setRenders(renders => renders + 1); // update the state to force render
}

function Layout({children, catalog}) {
  const forceUpdate = useForceUpdate();  

  const [dropdown, setDropdown]= useState(false);
  const [feedback, setFeedback] = useState(false);
  const [cart, setCart] = useState(false);
  const [category, setCategory] = useState('');
  const [good, setGood] = useState('nanotek-lf230-b');

  const [cartItems, setCartItems] = useState([]);
  
  const removeItem = (productId) => {
    console.log('remove',productId)
    if (typeof window !== 'undefined') {
    const data = cartItems;
    let products = data.filter(function(product) {return product.productId != productId;});
    console.log('removed, writing state');
    console.log(products);
    setCartItems(products);
    console.log('done, writing storage');
    localStorage.setItem('products', JSON.stringify(products));}
    console.log('forceUpdate');
    forceUpdate()
    console.log('check state', cartItems);
  }
  

  const cartOpen = () => {
    setCart(true)
  }
  const cartClose = () => {
    setCart(false);
  };
  const cartQty = () => {
    let total = 0
    cartItems.map(element => {
      if (isNaN(Number(element.qty))) {
        setCartItems([])
        localStorage.setItem('products', JSON.stringify([]));
        forceUpdate();
      }
      total = Number(element.qty) + total;
    });
    
    return `(${total})`
  }


  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const feedbackOpen = () => {
    setFeedback(true);
  };

  const feedbackClose = () => {
    setFeedback(false);
  };
  const catalogOpen = () => {
    setDropdown(true);
  }
  const catalogClose = useCallback(
    () => {
      setDropdown(false);
    },
    [],
  );


  useEffect(() => {
    var storageProducts = [];
    if (typeof window !== 'undefined') {
      console.log('getting shopping cart')
      if (localStorage.getItem('products')) {
      storageProducts = JSON.parse(localStorage.getItem('products'));
      setCartItems(storageProducts);
      }
    }
  }, [])





  return(<>
    <Container fluid className="mainFrame" >
      
      <Row className="headerRow">
        <Col className="col" lg='3'>
          <Link to="/">
            <img className='logo' src={Logo}/>
          </Link>
        </Col>
        <Col className="col" lg='3'>
          <h4 className='headerText'>
            противопожарные клапаны и вентиляционное
            оборудование от производителя
          </h4>
        </Col>
        <Col lg='6'>
          <Row>
            <Col className="col" lg='3'>
              <a href="mailto:fenixklapan@yandex.ru">
                <div className="contactItem flex column cRight">
                  <h5 style={{margin: 0, padding: 0}}>
                    fenixklapan@yandex.ru
                  </h5>
                  <span>
                    электронная почта
                  </span>
                </div>
              </a>
            </Col>
            <Col className="col" lg='3'>
              <a href="tel:+7(960)067-01-08">
              <div className="contactItem flex column cRight">
                <h5 style={{margin: 0, padding: 0}}>
                  +7 (960) 067-01-08
                </h5>
                <span>
                  телефон в Москве
                </span>
                </div>
              </a>
            </Col>
            <Col className="col" lg='3'>
                <a href="tel:+7(960)067-01-08">
                <div className="contactItem flex column cRight">
                  <h5 style={{margin: 0, padding: 0}}>
                    8 (800) 000-00-00
                  </h5>
                  <span>
                    бесплатно по России
                  </span>
                  </div>
                </a>
            </Col>
            <Col className="col" lg='3' style={{alignSelf:'center'}}>
                    <Button onClick={feedbackOpen} sx={{float: 'right', minWidth: '180px', height: '35px', fontFamily: 'Roboto',fontWeight: 400, fontSize: '.75rem',borderRadius: 0,color: 'white', backgroundColor: '#ff6429', '&:hover': {backgroundColor: '#d67f06'}}}>отправить заявку</Button>
                    <FeedbackModal open={feedback} handleClose={feedbackClose}/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
          <Col className="col" style={{marginTop: '30px'}}>
            <div style={{display: 'flex', fontWeight: 400}}>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/documents">Документация</Link></div>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/objects">Объекты</Link></div>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/contacts">Контакты</Link></div>
            </div>
          </Col>
      </Row>
      <Row>
          <Col className="col" lg="12" style={{position: 'relative', marginTop: '20px'}}>
          <div style={{display: 'flex', justifySelf: 'flex-start'}}>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <Button sx={{minWidth: '180px',height: '50px',fontFamily: 'Roboto',fontWeight: 600, fontSize: '14px', borderRadius: '0',color: 'white', backgroundColor: '#ff6429', '&:hover': {backgroundColor: '#d67f06'}}} onMouseOver={catalogOpen}>Каталог&nbsp;<span style={{fontSize: '8px'}}> ▶</span></Button>
            </div>
            
            <Paper
              component="form"
              sx={{mr: '10px', p: '2px 4px', display: 'flex', alignItems: 'center', boxShadow: 'none', backgroundColor: '#edf0f6', width: '100%'}}
            >
              <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="Поиск товаров и категорий"
                inputProps={{ 'aria-label': 'поиск товаров и категорий' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              
            </Paper>
            <Button onClick={cartOpen} sx={{minWidth: '180px',height: '50px',fontFamily: 'Roboto',fontWeight: 600, fontSize: '14px',borderRadius: 0,color: 'white', backgroundColor: '#006efb', '&:hover': {backgroundColor: '#0056c5'}}}><ShoppingCartIcon/> Корзина {cartItems.length > 0 && `${cartQty()}`} </Button>
          </div>
          <CartModal open={cart} handleClose={cartClose} removeItem={removeItem} context={[cartItems, setCartItems]}/>
          {dropdown && 
                          <Catalog position='first'catalogClose={catalogClose} categories={catalog} />
          }
        </Col>
      </Row>
      <Row>  



        <Col>
        {children}
        </Col>
      </Row>
    </Container>

    </>)
}


const DeleteMe = () => {
  return(
    <Container className="mainFrame" fluid style={{position: 'relative', zIndex: 999,border: '1px solid red'}}>
      <Row> 
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col className="col" style={{border: '1px solid red', height:'100vh'}}  sm='1' />
      </Row>
    </Container>
  )
}