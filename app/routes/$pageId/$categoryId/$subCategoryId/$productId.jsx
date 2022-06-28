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
    if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(params.pageId)) {
      try {
        const product = await prisma.catalog.findMany({
          where: {
            category: {equals: data.params.subCategoryId},
          },
          select: {
            subcat: {
              where: {
                name: {equals: data.params.productId}
              },
            },
          },
        })
        const products = await prisma.catalog.findMany({
          where: {
            category: {equals: data.params.subCategoryId},
          },
          select: {
            subcat: {
              where: {
                name: {not: data.params.productId}
              },
            },
          },
        })
        data.product = product[0].subcat[0]
        data.products = products[0].subcat
        data.product.picture = `${setSource(`${data.product.category_id}/${data.product.subcategory_id}/${data.product.name}.png`)}`
        data.products.forEach((item, key) => {
            data.products[key].picture = `${setSource(`${item.category_id}/${item.subcategory_id}/${item.name}.png`)}`
        })
    } catch(e) {
        console.log('85-LOADER ERROR:', e);
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