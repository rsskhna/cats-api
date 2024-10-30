import { Select } from 'antd';
import { FC } from 'react';
import { TBreed } from '@utils-types';

type TSelectBreedComponent = {
  selectValue: string;
  breeds: TBreed[];
  onSelect: (value: string) => void;
};

const SelectBreed: FC<TSelectBreedComponent> = ({
  onSelect,
  breeds,
  selectValue
}) => (
  <Select
    onSelect={(value) => onSelect(value)}
    value={selectValue}
    placeholder='Select a breed'
    options={breeds.map((breed) => ({
      value: `${breed.id}`,
      label: `${breed.name}`
    }))}
  />
);

export default SelectBreed;
