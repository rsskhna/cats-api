import styles from './card.module.css';
import React, { FC } from 'react';
import { TCat } from '@utils-types';
import { useDispatch } from '../../services/store';
import { deleteCard } from '../../services/slices/catsSlice/catsSlice';

type TCardComponent = {
  cardIndex: number;
  imageUrl: string;
};

const Card: FC<TCardComponent> = ({ imageUrl, cardIndex }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteCard(cardIndex));
  };

  return (
    <li className={styles.card}>
      <img className={styles.image} src={imageUrl} alt={'cat'} />

      <button className={styles.button} type={'button'} onClick={handleClick} />
    </li>
  );
};

export default Card;
