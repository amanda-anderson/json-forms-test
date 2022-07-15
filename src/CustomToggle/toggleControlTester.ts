import { rankWith, scopeEndsWith } from '@jsonforms/core';

export default rankWith(
  1000, //increase rank as needed
  scopeEndsWith('toggle')
);
