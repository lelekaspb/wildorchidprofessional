import { getSaleProducts } from "@/sanity/sanity-utils";
import styles from "./page.module.css";
import Breadcrumbs from "./Breadcrumbs";
import ProductMug from "@/app/components/product/mugs/ProductMug";

export default async function Sale() {
  const products = await getSaleProducts();

  return (
    <>
      {products.length > 0 && (
        <div>
          <section className={styles.bredcrumbs}>
            <Breadcrumbs />
          </section>
          <section className={styles.heading}>
            <h1 className={styles.heading_text}>Tilbud</h1>
          </section>

          <section className={styles.list}>
            {products.map((product, index) => (
              <ProductMug
                key={`${index}-${product._id}`}
                product={product}
                path="/products/sale/product"
              />
            ))}
          </section>
        </div>
      )}

      {products.length == 0 && <p>There are no products currently on sale</p>}
    </>
  );
}
