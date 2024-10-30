import '../../index.css';
import styles from './app.module.css';

import CardsList from '../cardsList/cardsList';
import Header from '../header/header';
import { useDispatch, useSelector } from '../../services/store';
import {
  getCats,
  selectCats,
  selectLoading
} from '../../services/slices/catsSlice/catsSlice';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { useInView } from 'react-intersection-observer';

const App = () => {
  const cats = useSelector(selectCats);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1
  });

  useEffect(() => {
    dispatch(getCats());
  }, [inView, dispatch]);

  return (
    <div className={styles.app}>
      <Header />

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
