import styles from './cardsList.module.css';
import Card from '../card/card';
import { TCat } from '../../utils/types';
import { FC } from 'react';
import { Spin } from 'antd';

type TCardsListComponent = {
  cards: TCat[];
};

const cardsList: FC<TCardsListComponent> = ({ cards }) => {
  if (cards) {
    return (
      <ul className={styles.list}>
        {cards.map((card, index) => (
          <Card imageName={card.id} imageUrl={card.url} key={index} />
        ))}
      </ul>
    );
  }

  return <Spin />;
};

export default cardsList;
