import React, { useState } from 'react';
import { Toggle as ToggleCl, Label, Box } from 'cl2-component-library';
// import { Labels } from '@jsonforms/core';

interface RatingProps {
  id?: string;
  value: boolean;
  label: string;
  updateValue: (newValue: boolean) => void;
}

export const Toggle: React.FC<RatingProps> = ({
  id,
  value,
  updateValue,
  label,
}) => {
  const [checked, setChecked] = useState<boolean>(value);

  return (
    <div id='#/properties/toggle' className='toggle'>
      <Label>Rating</Label>
      <Box display='flex'>
        <ToggleCl
          label={label.toString()}
          checked={checked}
          onChange={() => {
            updateValue(!value);
            setChecked(!value);
          }}
        />
        {/* <IconTooltip content='Tooltip content' /> */}
      </Box>
    </div>
  );
};
