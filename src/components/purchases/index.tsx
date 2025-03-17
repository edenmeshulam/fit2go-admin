import {
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  TopToolbar,
} from 'react-admin';

const purchaseFilters = [
  <ReferenceInput source="userId" reference="users">
    <SelectInput optionText="email" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={purchaseFilters} />
    <ExportButton />
  </TopToolbar>
);

export const PurchaseList = () => (
  <List actions={<ListActions />} filters={purchaseFilters}>
    <Datagrid>
      <ReferenceField source="userId" reference="users">
        <TextField source="email" />
      </ReferenceField>
      <TextField source="type" />
      <NumberField
        source="amount"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <DateField source="createdAt" showTime />
    </Datagrid>
  </List>
);
