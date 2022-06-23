import { useLoaderData, useOutletContext  } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/productCard";


export const loader = async({params}) => {
  const data = {};
    data.params = params
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

    return(data)
  }

export default function () {
  const data = useLoaderData();
  return (
    <ProductCard data={data} />
  )
}