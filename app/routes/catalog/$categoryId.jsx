import { Outlet, useLoaderData } from "@remix-run/react";
import { Col, Row } from "react-bootstrap";
import categories from'~/data/categories'


export const loader = async({params}) => {
//  params.subCategoryId
let data = {}

data.cat = categories.find((category) => category.listName === params.categoryId);
console.log('11', data.cat)
if (params.subCategoryId) { 
  console.log('13', params.subCategoryId, '=>', params.subCategoryId.toLowerCase())
  if (data.cat.content.find((product) => product.id === params.subCategoryId.toLowerCase())) {
    data.product = data.cat.content.find((product) => product.id === params.subCategoryId.toLowerCase());
    data.subCat = 'none';
  } else if (categories.find((category) => category.subCategories.find((subCategory) => subCategory.listName === params.subCategoryId.toLowerCase()))) {
    data.subCat = params.subCategoryId
}} else {
  data.subCat = 'none';
  data.product =  data.cat.content[0];
}
console.log('21', {...data})
return({...data})
}

export default function () {
  const data = useLoaderData();
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        catalog/$categoryId
        <h1>
          <CategoryText data={data}/>
        </h1>
        v Outlet v @catalog/$categoryId<br/>
      <Outlet/>
      </div>
    );
  }


  const CategoryText = (props) => {
    const data = {};
    if (props.data.subCat !== 'none') {
      data.category = props.data.subCat.displayName
    } else {
      data.category = props.data.cat.displayName
    }
    if (props.data.product !== 'none') {
      data.product = props.data.product.title
    } else {
      data.product = props.data.cat.content[0].title
    }
    return(<Row><Col md='3'>{data.category}</Col><Col md='3'>{data.product}</Col></Row>)
  }