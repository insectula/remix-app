import { Outlet, useLoaderData } from "@remix-run/react";
import { Col, Row } from "react-bootstrap";
import categories from'~/data/categories'


export const loader = async({params}) => {
//  params.subCategoryId
const data = {}

data.cat = categories.find(category => category.listName === params.categoryId);
if (params.subCategoryId) { 
  if (data.cat.content.find((item, i) => item.id === params.subCategoryId)) {
    data.product = params.cat.content.find(product => product.id === params.subCategoryId);
  } else {
    data.subCat = params.subCategoryId
}} else {
  data.subCat = 'none';
  data.product =  data.cat.content[0];
}
console.log({...data})
return({...data})
}

export default function () {
  const data = useLoaderData();
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>
          <CategoryText data={data}/>
        </h1>
        v Outlet v<br/>
      <Outlet/>
      </div>
    );
  }
  //data.goods 
  //data.categories

  const CategoryText = (props) => {
    console.log(props.data)
    const cat=props.data.cat
    const subCat=props.data.subCat
    const product = props.data.product
    const data = {};
    if (subCat !== 'none') {
      console.log(subCat);
      data.category = subCat.displayName
    } else {
      data.category = cat.displayName
    }
    if (data.product !== 'none') {
      data.product = product.title
    } else {
      data.product = cat.content[0].title
    }
    console.log(data)
    return(<Row><Col md='3'>{data.category}</Col><Col md='3'>{data.product}</Col></Row>)
  }