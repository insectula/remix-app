import { useParams, useLoaderData } from "@remix-run/react";
export default function () {

    const params = useParams();
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>~/routes/catalog/$categoryId/$subCategoryId/$productId.jsx = {params.productId}</h1>
      data for {params.productId}
      </div>
    );
  }
  