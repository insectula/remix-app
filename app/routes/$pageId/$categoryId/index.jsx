
import { useLoaderData } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/pages/productCard";
import dino from '~/assets/PNG/dino.png';
import desert from "~/assets/JPG/desert.jpg";

export const loader = async({params}) => {
    const setSource = (path) => {
      console.log(`YO/images/categories/${path}`)
      try{
          const src = require(`/images/categories/${path}`)
          console.log('src='+src)
          return src;
      }
      catch(err){
          console.log('err='+err)
          return dino;
      }
    }
    const data = {};
    data.params = params
    if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(data.params.pageId)) {
      try {
          const catalog = await prisma.catalog.findMany({
            where: {
              category: {equals: data.params.categoryId},
            },
            select: {
              cat: true
            },
          })
          const [first, ...others] = catalog[0].cat;
          data.product = first;
          data.products = others;
          data.product.picture = `${setSource(`${data.product.category_id}/${data.product.subcategory_id}/${data.product.name}.png`)}`
          data.products.forEach((item, key) => {
              data.products[key].picture = `${setSource(`${item.category_id}/${item.subcategory_id}/${item.name}.png`)}`
          })
      } catch(e) {
          console.log('LOADER ERROR:', e);
      }
    }
    return(data)
  }

  export default function() {
    const data = useLoaderData();
    if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(data.params.pageId)) {
        return <ProductCard data={data} />
    } else {
      return (
        <div style={{marginTop: '200px', backgroundImage: `url(${desert})`, backgroundSize: 'conrain', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat', height: '450px'}}>
          <div className="pageTitle">
            <span style={{fontSize: '30px'}}>
              Страница не найдена
            </span>
          </div>
        </div>
      )
    }
  }