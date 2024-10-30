import styles from './cardsList.module.css';
import Card from '../card/card';
import { TCat } from '../../utils/types';
import { FC } from 'react';
import { Spin } from 'antd';
import { useSelector } from '../../services/store';
import { selectLoading } from '../../services/slices/catsSlice/catsSlice';

type TCardsListComponent = {
  cards: TCat[];
};

const cardsList: FC<TCardsListComponent> = ({ cards }) => {
  const loading = useSelector(selectLoading);

  if (loading) {
    return <Spin size={'large'} />;
  }
  return (
    <ul className={styles.list}>
      {cards.map((card, index) => (
        <Card imageName={card.id} imageUrl={card.url} key={index} />
      ))}
    </ul>
  );
};
export default cardsList;
