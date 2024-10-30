import '../../index.css';
import styles from './app.module.css';

import CardsList from '../cardsList/cardsList';
import Header from '../header/header';
import { useDispatch, useSelector } from '../../services/store';
import {
  getCats,
  getSpecificCats,
  selectCats,
  selectLoading,
  setCatsState
} from '../../services/slices/catsSlice/catsSlice';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useInView } from 'react-intersection-observer';
import {
  getBreeds,
  selectBreeds
} from '../../services/slices/breedsSlice/breedsSlice';
import SelectBreed from '../selectBreed/selectBreed';

const App = () => {
  const cats = useSelector(selectCats);
  const breeds = useSelector(selectBreeds);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1
  });
  const [selectValue, setSelectValue] = useState('all');

  const handleSelect = (val: string) => {
    setSelectValue(val);
    dispatch(setCatsState([]));
  };

  useEffect(() => {
    dispatch(getBreeds());
  }, []);

  useEffect(() => {
    if (selectValue !== 'all') {
      dispatch(getSpecificCats(selectValue));
    } else {
      dispatch(getCats());
    }
  }, [inView]);

  return (
    <div className={styles.app}>
      <Header />

      <SelectBreed
        breeds={breeds}
        onSelect={handleSelect}
        selectValue={selectValue}
      />

      <CardsList cards={cats} />

      {loading ? (
        <Spin size={'large'} />
      ) : (
        <div ref={ref} className={styles.trigger} />
      )}
    </div>
  );
};

export default App;
