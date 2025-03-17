import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TopToolbar,
} from 'react-admin';

const reviewFilters = [
  <ReferenceInput source="serviceId" reference="services">
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={reviewFilters} />
    <ExportButton />
  </TopToolbar>
);

export const ReviewList = () => (
  <List actions={<ListActions />} filters={reviewFilters}>
    <Datagrid rowClick="edit">
      <ReferenceField source="serviceId" reference="services">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="userId" reference="users">
        <TextField source="email" />
      </ReferenceField>
      <NumberField source="rating" />
      <TextField source="comment" />
      <DateField source="createdAt" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput
        source="status"
        choices={[
          { id: 'PENDING', name: 'Pending' },
          { id: 'APPROVED', name: 'Approved' },
          { id: 'REJECTED', name: 'Rejected' },
        ]}
      />
    </SimpleForm>
  </Edit>
);
