import { useState } from 'react';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Container, Col, Row } from "react-bootstrap";
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';
import globalCss from '~/styles/global.css'

import { Button } from '@mui/material';
import FeedbackModal from '~/components/feedbackModal';
import Logo from '~/assets/SVG/logo.svg';

export const links = () => ([
  {rel: 'stylesheet', href: bootstrapCss},
  {rel: 'stylesheet', href: globalCss},
  {rel: 'stylesheet', href:'http://fonts.cdnfonts.com/css/gotham'}
])

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return(
    <Document>
      <Layout>
      v Outlet v @root<br/>
        <Outlet />
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

function Layout({children}) {
  const [feedback, setFeedback] = useState(false);

  const feedbackOpen = () => {
    setFeedback(true);
  };

  const feedbackClose = () => {
    setFeedback(false);
  };

  return(<>
    <DeleteMe />
    <Container fluid className="mainFrame" style={{border: '2px solid green', position: 'relative', zIndex: 50}}>
      <Row className="headerRow">
        <Col md='3'>
          <Link to="/">
            <img className='logo' src={Logo}/>
          </Link>
        </Col>
        <Col md='2'>
          <h4 className='headerText'>
            противопожарные клапаны и вентиляционное
            оборудование<br/> от производителя
          </h4>
        </Col>
        <Col md='7' style={{border: '1px solid'}}>
          <Row>
            <Col md={{span: 3, offset: 1}}>
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
            <Col md='3'>
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
            <Col md='3'>
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
            <Col md='2' style={{padding:0, alignSelf:'center'}}>
                    <Button onClick={feedbackOpen} sx={{width: '100%', height: '35px', fontFamily: 'Roboto',fontWeight: 400, fontSize: '.75rem',borderRadius: 0,color: 'white', backgroundColor: '#ff6429', '&:hover': {backgroundColor: '#d67f06'}}}>отправить заявку</Button>
                    <FeedbackModal open={feedback} handleClose={feedbackClose}/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
          <Col style={{marginTop: '20px'}}>
            <div style={{display: 'flex', fontWeight: 400}}>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/documents">Документация</Link></div>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/objects">Объекты</Link></div>
              <div className='menu' style={{display: 'flex', flexDirection:'column', marginRight:'30px'}}><Link to="/contacts">Контакты</Link></div>
            </div>
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
    <Container fluid style={{border: '1px solid red', margin:'-30px 55px', position: 'absolute', maxWidth: 1800}}>
      <Row> 
        <Col style={{border: '1px solid red', height:'100vh'}} sm='1' > root </Col>
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
        <Col style={{border: '1px solid red', height:'100vh'}}  sm='1' />
      </Row>
    </Container>
  )
}