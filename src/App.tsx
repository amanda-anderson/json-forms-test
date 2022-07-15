import { Fragment, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './App.css';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import ToggleControl from '../src/CustomToggle/ToggleControl';
import toggleControlTester from '../src/CustomToggle/toggleControlTester';
import { makeStyles } from '@mui/styles';

import CustomGroupRenderer, { myGroupTester } from './customLayout';

let counter = 1;

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  name: 'Amanda',
  description: 'Long description',
};

const initialJsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      title: 'Long Description',
      type: 'string',
    },
  },
  required: ['name', 'due_date'],
};

const initialUiJsonSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/description',
      options: {
        multi: true,
      },
    },
  ],
};

const renderers1 = [
  ...materialRenderers,
  { tester: ratingControlTester, renderer: RatingControl },
];

const renderers2 = [
  ...materialRenderers,
  { tester: myGroupTester, renderer: CustomGroupRenderer },
  { tester: toggleControlTester, renderer: ToggleControl },
];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const [useCustom, setUseCustom] = useState<any>(false);
  const [jsonSchema, setJsonSchema] = useState<any>(initialJsonSchema);
  const [uiJsonSchema, setuiJsonSchema] = useState<any>(initialUiJsonSchema);

  const stringifiedData = JSON.stringify(data, null, 2);
  const stringifiedJsonSchema = JSON.stringify(jsonSchema, null, 2);
  const stringifiedUiJsonSchema = JSON.stringify(uiJsonSchema, null, 2);

  const loadCustomGroupExample = () => {
    setUseCustom(true);
  };

  /**********************************************************************
   Example with ALL out-of-the-box controls with MaterialUI
  **********************************************************************/
  const loadAllIncludedControls = () => {
    setUseCustom(false);
    setData({
      name: 'Amanda',
      description: 'Long description',
      time: '11:30:00',
      date: '2022-07-22',
      dateTime: '2022-07-22T00:24:00+02:00',
      enum: 'Two',
      number: 12.123,
      string: 'This is a text field',
      boolean: true,
      integer: 223,
    });

    setJsonSchema({
      type: 'object',
      properties: {
        string: {
          type: 'string',
        },
        boolean: {
          type: 'boolean',
        },
        number: {
          type: 'number',
        },
        integer: {
          type: 'integer',
        },
        date: {
          type: 'string',
          format: 'date',
        },
        time: {
          type: 'string',
          format: 'time',
        },
        dateTime: {
          type: 'string',
          format: 'date-time',
        },
        enum: {
          type: 'string',
          enum: ['One', 'Two', 'Three'],
        },
        multilineString: {
          type: 'string',
          description: 'Multiline Example',
        },
        slider: {
          type: 'number',
          minimum: 1,
          maximum: 10,
          default: 2,
          description: 'Slider Example',
        },
        trimText: {
          type: 'string',
          description:
            'Trim indicates whether the control shall grab the full width available',
        },
        restrictText: {
          type: 'string',
          maxLength: 5,
          description:
            'Restricts the input length to the set value (in this case: 5)',
        },
        unfocusedDescription: {
          type: 'string',
          description:
            'This description is shown even when the control is not focused',
        },
        hideRequiredAsterisk: {
          type: 'string',
          description: 'Hides the "*" symbol, when the field is required',
        },
        toggle: {
          type: 'boolean',
          description:
            'The "toggle" option renders boolean values as a toggle.',
        },
      },
    });

    setuiJsonSchema({
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/string',
          label: 'Do you want to answer a text field?',
        },
        {
          type: 'Control',
          scope: '#/properties/boolean',
          label: 'Do you want to input a boolean?',
        },
        {
          type: 'Control',
          scope: '#/properties/number',
          label: 'Do you want to input a number?',
        },
        {
          type: 'Control',
          scope: '#/properties/integer',
          label: 'Do you want to input an integer?',
        },
        {
          type: 'Control',
          scope: '#/properties/date',
          label: 'Do you want to input a date?',
        },
        {
          type: 'Control',
          scope: '#/properties/time',
          label: 'Do you want to input a time?',
        },
        {
          type: 'Control',
          scope: '#/properties/dateTime',
          label: 'Do you want to input a dateTime?',
        },
        {
          type: 'Control',
          scope: '#/properties/enum',
          label: 'Do you want to select an enum?',
        },
        {
          type: 'Control',
          scope: '#/properties/multilineString',
          label: 'Do you want to input multi-line string?',
          options: {
            multi: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/slider',
          label: 'Do you want to input using a slider?',
          options: {
            slider: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/trimText',
          options: {
            trim: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/restrictText',
          options: {
            restrict: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/unfocusedDescription',
          options: {
            showUnfocusedDescription: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/hideRequiredAsterisk',
          options: {
            hideRequiredAsterisk: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/toggle',
          label: 'Boolean as Toggle',
          options: {
            toggle: true,
          },
        },
      ],
    });
  };

  /**********************************************************************
   Custom CL Component example
  **********************************************************************/
  const loadCustomClExample = () => {
    setUseCustom(true);
    setJsonSchema({
      type: 'object',
      properties: {
        toggle: {
          type: 'boolean',
          description:
            'The "toggle" option renders boolean values as a toggle.',
        },
      },
      required: [],
    });

    setuiJsonSchema({
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/toggle',
          label: 'Toggle label set by user',
          uiDescription: 'other description value',
          options: {
            toggle: true,
          },
        },
      ],
    });
  };
  /**********************************************************************
   Extended controls example
  **********************************************************************/
  const loadExtendedControlsExample = () => {
    setUseCustom(false);
    setJsonSchema({
      type: 'object',
      properties: {
        multilineString: {
          type: 'string',
          description: 'Multiline Example',
        },
        slider: {
          type: 'number',
          minimum: 1,
          maximum: 10,
          default: 1,
          description: 'Slider Example',
        },
        trimText: {
          type: 'string',
          description:
            'Trim indicates whether the control shall grab the full width available',
        },
        restrictText: {
          type: 'string',
          maxLength: 5,
          description:
            'Restricts the input length to the set value (in this case: 5)',
        },
        unfocusedDescription: {
          type: 'string',
          description:
            'This description is shown even when the control is not focused',
        },
        toggle: {
          type: 'boolean',
          description:
            'The "toggle" option renders boolean values as a toggle.',
        },
      },
      required: ['hideRequiredAsterisk', 'restrictText'],
    });

    setuiJsonSchema({
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/multilineString',
          options: {
            multi: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/slider',
          options: {
            slider: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/trimText',
          options: {
            trim: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/restrictText',
          options: {
            restrict: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/unfocusedDescription',
          options: {
            showUnfocusedDescription: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/toggle',
          label: 'Boolean as Toggle',
          options: {
            toggle: true,
          },
        },
      ],
    });
  };

  /**********************************************************************
   Multi-step example
  **********************************************************************/
  const loadStepperExample = () => {
    setUseCustom(false);
    setJsonSchema({
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your first name',
        },
        secondName: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your second name',
        },
        vegetarian: {
          type: 'boolean',
        },
        birthDate: {
          type: 'string',
          format: 'date',
          description: 'Please enter your birth date.',
        },
        nationality: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
        provideAddress: {
          type: 'boolean',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            streetNumber: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            postalCode: {
              type: 'string',
              maxLength: 5,
            },
          },
        },
        vegetarianOptions: {
          type: 'object',
          properties: {
            vegan: {
              type: 'boolean',
            },
            favoriteVegetable: {
              type: 'string',
              enum: [
                'Tomato',
                'Potato',
                'Salad',
                'Aubergine',
                'Cucumber',
                'Other',
              ],
            },
            otherFavoriteVegetable: {
              type: 'string',
            },
          },
        },
      },
    });

    setuiJsonSchema({
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Basic Information',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/firstName',
                },
                {
                  type: 'Control',
                  scope: '#/properties/secondName',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/birthDate',
                },
                {
                  type: 'Control',
                  scope: '#/properties/nationality',
                },
              ],
            },
            {
              type: 'Control',
              scope: '#/properties/provideAddress',
            },
            {
              type: 'Control',
              scope: '#/properties/vegetarian',
            },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/street',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/streetNumber',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/postalCode',
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/street',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/streetNumber',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/postalCode',
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/street',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/streetNumber',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/postalCode',
                },
              ],
            },
          ],
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/provideAddress',
              schema: {
                const: true,
              },
            },
          },
        },
        {
          type: 'Category',
          label: 'Additional',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/vegetarianOptions/properties/vegan',
            },
            {
              type: 'Control',
              scope:
                '#/properties/vegetarianOptions/properties/favoriteVegetable',
            },
            {
              type: 'Control',
              scope:
                '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            },
          ],
        },
      ],
      options: {
        variant: 'stepper',
        showNavButtons: true,
      },
    });

    setData({});
  };

  /**********************************************************************
   Load in the multi-step example schema
  **********************************************************************/
  const loadMultistepExample = () => {
    setUseCustom(false);
    setuiJsonSchema({
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Person',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/person/properties/firstName',
                },
                {
                  type: 'Control',
                  scope: '#/properties/person/properties/lastName',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/person/properties/age',
                },
                {
                  type: 'Control',
                  label: 'Address',
                  scope: '#/properties/person/properties/shippingAddress',
                },
              ],
            },
          ],
        },
        {
          type: 'Group',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/person/properties/shippingAddress',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/street',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/zipCode',
                },
              ],
            },
          ],
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/person/properties/shippingAddress',
              schema: {
                const: 'Home Address 1',
              },
            },
          },
        },
      ],
    });

    setJsonSchema({
      type: 'object',
      properties: {
        person: {
          title: 'Person',
          type: 'object',
          description: 'This is the description of a section.',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            age: {
              description: 'Age in years',
              type: 'integer',
              minimum: 0,
            },
            shippingAddress: {
              $ref: '#/properties/address/properties/addressId',
            },
          },
          required: ['firstName', 'lastName'],
        },
        address: {
          title: 'Order',
          type: 'object',
          properties: {
            addressId: {
              type: 'string',
              label: 'Address Type',
              enum: ['Home Address 1', 'Home Address 2', 'Workplace'],
            },
            street: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            zipCode: {
              type: 'string',
            },
          },
        },
      },
    });

    setData({});
  };

  /**********************************************************************
   Add field with a rule
  **********************************************************************/
  const addFieldWithRule = () => {
    setUseCustom(false);
    let newJsonSchema = jsonSchema;
    const newField = 'newField' + counter.toString() + ' w Rule';
    newJsonSchema.properties[newField] = {
      type: 'string',
      minLength: 1,
    };
    const temp = {};
    Object.assign(temp, newJsonSchema);
    setJsonSchema(temp);
    // https://github.com/rjsf-team/react-jsonschema-form/issues/517

    const newUiSchema = uiJsonSchema;
    const newScope = '#/properties/' + newField;
    newUiSchema.elements.push({
      type: 'Control',
      scope: newScope,
      rule: {
        effect: 'HIDE',
        condition: {
          scope: '#/properties/name',
          schema: {
            const: 'John',
          },
        },
      },
    });
    setuiJsonSchema(newUiSchema);
    counter++;
  };

  /**********************************************************************
   Reset
  **********************************************************************/
  const reset = () => {
    setUseCustom(false);
    setData(initialData);
    const temp = {};
    Object.assign(temp, initialJsonSchema);
    setJsonSchema(temp);
    const temp2 = {};
    Object.assign(temp2, initialUiJsonSchema);
    setuiJsonSchema(temp2);
  };
  /**********************************************************************
   Add new text or number field
  **********************************************************************/
  const addNewField = (type: string) => {
    setUseCustom(false);
    if (type === 'text') {
      let newJsonSchema = jsonSchema;
      const newField = 'newField' + counter.toString() + ': Text';
      newJsonSchema.properties[newField] = {
        type: 'string',
        minLength: 1,
      };
      const temp = {};
      Object.assign(temp, newJsonSchema);
      setJsonSchema(temp);
      // https://github.com/rjsf-team/react-jsonschema-form/issues/517

      const newUiSchema = uiJsonSchema;
      const newScope = '#/properties/' + newField;
      newUiSchema.elements.push({
        type: 'Control',
        scope: newScope,
      });
      setuiJsonSchema(newUiSchema);
    }
    if (type === 'number') {
      let newJsonSchema = jsonSchema;
      const newField = 'newField' + counter.toString() + ': Number';
      newJsonSchema.properties[newField] = {
        type: 'number',
      };
      const temp = {};
      Object.assign(temp, newJsonSchema);
      setJsonSchema(temp);
      // https://github.com/rjsf-team/react-jsonschema-form/issues/517

      const newUiSchema = uiJsonSchema;
      const newScope = '#/properties/' + newField;
      newUiSchema.elements.push({
        type: 'Control',
        scope: newScope,
      });
      setuiJsonSchema(newUiSchema);
    }
    counter++;
  };

  return (
    <Fragment>
      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid style={{ backgroundColor: '#eeeeee' }} item sm={6}>
          <Typography variant={'h6'} className={classes.title}>
            Survey Data
          </Typography>
          <div style={{ fontSize: '12px' }} className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
          <Typography variant={'h6'} className={classes.title}>
            JSON Schema
          </Typography>
          <div style={{ fontSize: '12px' }} className={classes.dataContent}>
            <pre id='boundData'>{stringifiedJsonSchema}</pre>
          </div>
          <Typography variant={'h6'} className={classes.title}>
            UI Schema
          </Typography>
          <div style={{ fontSize: '12px' }} className={classes.dataContent}>
            <pre id='boundData'>{stringifiedUiJsonSchema}</pre>
          </div>
        </Grid>
        <Grid item sm={6}>
          <button className='greyButton' onClick={() => loadMultistepExample()}>
            Load Multi-step Example
          </button>
          <button
            className='greyButton'
            onClick={() => loadCustomGroupExample()}
          >
            Load Custom Layout Example
          </button>
          <button className='greyButton' onClick={() => loadStepperExample()}>
            Load Stepper Example
          </button>
          <button
            className='greyButton'
            onClick={() => loadExtendedControlsExample()}
          >
            Load Extended Controls Example
          </button>
          <button className='greyButton' onClick={() => loadCustomClExample()}>
            Load Custom CL Example
          </button>
          <button
            className='greyButton'
            onClick={() => loadAllIncludedControls()}
          >
            Load Example All Default Controls
          </button>
          <button className='greyButton' onClick={() => reset()}>
            Reset
          </button>
          <Typography variant={'h6'} className={classes.title}>
            Rendered Form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={jsonSchema}
              uischema={uiJsonSchema}
              data={data}
              renderers={useCustom ? renderers2 : renderers1}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
            <span style={{ color: '#d8d8d8', marginTop: '16px' }}>
              ____________________________________________________________________________
            </span>
            <br></br>
            <button className='blueButton' onClick={() => addNewField('text')}>
              Add Text Field
            </button>
            <button
              className='orangeButton'
              onClick={() => addNewField('number')}
            >
              Add Number Field
            </button>
            <button className='greenButton' onClick={addFieldWithRule}>
              Add Field With Rule
            </button>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
