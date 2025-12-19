import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-b9d37-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );
  const [sales, setSales] = useState(props.sales);

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          ...data[key],
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load sales data</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-b9d37-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      ...data[key],
    });
  }
  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
