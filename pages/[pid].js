import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage(props) {
  const { loadedProduct } = props;
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return { props: { loadedProduct: product } };
}

export async function getStaticPaths() {
  const data = await getData();

  const pathsWithParams = data.products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  };
}

export default ProductDetailPage;
