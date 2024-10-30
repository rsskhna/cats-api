import styles from './card.module.css';
import React, { FC } from 'react';

type TCardComponent = {
  imageUrl: string;
  imageName: string;
};

const Card: FC<TCardComponent> = ({ imageUrl, imageName }) => (
  <li className={styles.card}>
    <img className={styles.image} src={imageUrl} alt={imageName} />
  </li>
);

export default Card;
