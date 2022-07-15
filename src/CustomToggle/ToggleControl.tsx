import { withJsonFormsControlProps } from '@jsonforms/react';
import { Toggle } from './Toggle';

interface ToggleControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  label: string;
}

const ToggleControl = ({
  data,
  handleChange,
  path,
  label,
}: ToggleControlProps) => (
  <Toggle
    label={label}
    value={data}
    updateValue={(newValue: boolean) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(ToggleControl);
