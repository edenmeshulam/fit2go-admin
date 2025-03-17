import {
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  TopToolbar,
} from 'react-admin';

const creditCardFilters = [
  <ReferenceInput source="userId" reference="users">
    <SelectInput optionText="email" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={creditCardFilters} />
    <ExportButton />
  </TopToolbar>
);

export const CreditCardList = () => (
  <List actions={<ListActions />} filters={creditCardFilters}>
    <Datagrid>
      <ReferenceField source="userId" reference="users">
        <TextField source="email" />
      </ReferenceField>
      <TextField source="lastFourDigits" />
      <TextField source="brand" />
      <DateField source="expiryDate" />
      <DateField source="createdAt" showTime />
    </Datagrid>
  </List>
);
