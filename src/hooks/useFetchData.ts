import { useEffect, useState } from 'react';
import { InstrumentsData } from '../services/instruments.api';
import { TableItem } from '../components/Table/types';

export const useFetchData = () => {
    const [data, setData] = useState<TableItem[]>([]);
  
    useEffect(() => {
      const fetchAndSetData = async () => {
        const fetchedData = await InstrumentsData();
        setData(fetchedData);
      };
  
      fetchAndSetData();
    }, []);
  
    return { data , InstrumentsData};
  };
  