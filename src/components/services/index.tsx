import {
  AutocompleteInput,
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
  ReferenceInput,
  RichTextField,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';

const serviceFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="businessId" reference="business">
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={serviceFilters} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const ServiceList = () => (
  <List actions={<ListActions />} filters={serviceFilters}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <RichTextField source="description" />
      <NumberField
        source="price"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <ReferenceInput source="businessId" reference="business">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

export const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" />
      <ReferenceInput source="businessId" reference="business">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" />
      <ReferenceInput source="businessId" reference="business">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
