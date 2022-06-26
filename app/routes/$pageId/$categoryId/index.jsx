
import { useLoaderData } from "@remix-run/react";
import { prisma } from '~/db';
import Catalog from "~/components/pages/catalog"

export const loader = async({params}) => {
    const data = {};
    data.params = params
    if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(data.params.pageId)) {
      try {
          const catalog = await prisma.catalog.findMany({
            where: {
              category: {equals: data.params.categoryId},
            },
            select: {
              cat: {
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
          const [first, ...others] = catalog[0].cat;
          data.product = first;
          data.products = others;
      } catch(e) {
          console.log('LOADER ERROR:', e);
      }
    }
    return(data)
  }

  export default function() {
    const data = useLoaderData();
    if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(data.params.pageId)) {
        return <Catalog data={data}/>
    } else {
        return <div style={{marginTop: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center', fontSize: '2.5em', fontWeight: 600}}>Страница не найдена</div>
    }
  }