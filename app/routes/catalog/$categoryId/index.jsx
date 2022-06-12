import { useParams } from "@remix-run/react";

export default function () {
    const params = useParams();
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>~/routes/catalog/{params.categoryId}/index.jsx</h1>
        <h2>ДЕФОЛТНЫЙ ТОВАР для {params.categoryId}</h2>
      </div>
    );
  }
  