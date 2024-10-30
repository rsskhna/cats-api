import '../../index.css';
import styles from './app.module.css';

import CardsList from '../cardsList/cardsList';
import Header from '../header/header';
import { useDispatch, useSelector } from '../../services/store';
import { getCats, selectCats } from '../../services/slices/catsSlice/catsSlice';
import { useEffect } from 'react';

const App = () => {
  const cats = useSelector(selectCats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCats);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />

      <CardsList cards={cats} />
    </div>
  );
};

export default App;
