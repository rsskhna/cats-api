import styles from './cardsList.module.css';
import Card from '../card/card';
import { TCat } from '../../utils/types';
import React, { FC } from 'react';
import { nanoid } from '@reduxjs/toolkit';

type TCardsListComponent = {
  cards: TCat[];
};

const cardsList: FC<TCardsListComponent> = ({ cards }) => (
  <ul className={styles.list}>
    {cards.map((card, index) => (
      <Card imageUrl={card.url} key={nanoid()} cardIndex={index} />
    ))}
  </ul>
);
export default cardsList;
