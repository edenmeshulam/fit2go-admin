import {
  BooleanField,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';

const packageFilters = [<TextInput source="q" label="Search" alwaysOn />];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={packageFilters} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PackageList = () => (
  <List actions={<ListActions />} filters={packageFilters}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <NumberField
        source="price"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <NumberField source="credits" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

export const PackageCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" />
      <NumberInput source="credits" />
    </SimpleForm>
  </Create>
);

export const PackageEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" />
      <NumberInput source="credits" />
    </SimpleForm>
  </Edit>
);
