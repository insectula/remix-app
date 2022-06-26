import { useLoaderData } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/pages/productCard";
import Contacts from "~/components/pages/contacts";
import desert from "~/assets/JPG/desert.jpg";
 
export const loader = async({params}) => {
  const data = {};
  data.params = params
  if (['каталог', 'Каталог', 'КАТАЛОГ'].includes(params.pageId)) {
    try {
        const catalog = await prisma.catalog.findMany({
          where: {
            id: 5,
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
      return <ProductCard data={data} />
  } 
  else if (['контакты', 'Контакты', 'КОНТАКТЫ'].includes(data.params.pageId)) {
      return <Contacts/>
  }
  else {
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