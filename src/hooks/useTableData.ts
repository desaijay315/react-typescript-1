import { useEffect, useState } from 'react';
import { fetchData } from '../api/tableDataService';
import { TableItem } from '../components/Table/types/table';

export const useTableData = () => {
    const [data, setData] = useState<TableItem[]>([]);
  
    useEffect(() => {
      const fetchAndSetData = async () => {
        console.log("Fetching data..."); // Log to check if fetchData function is called
        const fetchedData = await fetchData();
        console.log("Fetched data:", fetchedData); // Log to check the fetched data
        setData(fetchedData);
      };
  
      fetchAndSetData();
    }, []);
  
    return { data , fetchData};
  };
  