import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-b9d37-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );
  const [sales, setSales] = useState();

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

  if (!data || !sales) return <p>No sales data found</p>;

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

export default LastSalesPage;
