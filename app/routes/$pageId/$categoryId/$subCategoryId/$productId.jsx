import { useLoaderData } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/pages/productCard";


export const loader = async({params}) => {
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
              select: {
                name: true,
                title: true,
                picture: true,
                content: true,
                hidden: true,
                filter: true
              }
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
              select: {
                name: true,
                title: true,
                picture: true,
                content: true,
                hidden: true,
                filter: true
              }
            },
          },
        })
        data.product = product[0].subcat[0]
        data.products = products[0].subcat
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
        return <div style={{marginTop: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center', fontSize: '2.5em', fontWeight: 600}}>Страница не найдена</div>
    }
  }