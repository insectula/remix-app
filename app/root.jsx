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

export const links = () => ([
  {rel: 'stylesheet', href: bootstrapCss},
  {rel: 'stylesheet', href: globalCss},
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
      v Outlet v<br/>
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
  return(
    <Container>
      <Row>
        <Col md='1'>
          <Link to="/">Main</Link>
        </Col>
        <Col md='1'>
          <Link to='/catalog'>Catalog</Link>
        </Col>
        <Col md='2'>
          <Link to='/catalog/Категория'>Категория</Link>
        </Col>
        <Col md='2'>
          <Link to='/catalog/Электроприводы'>Электроприводы</Link>
        </Col>
        <Col md='2'>
          <Link to='/catalog/Категория/Подкатегория'>Категория/Подкатегория</Link>
        </Col>
        <Col md='2'>
          <Link to='/catalog/Электроприводы/Воздушные'>Электроприводы/Воздушные</Link>
        </Col>
      </Row>
      <Row>
        <h1>Шапка</h1>
        <Col>
        {children}
        </Col>
      </Row>
    </Container>
  )
}