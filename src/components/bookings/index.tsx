import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  ExportButton,
  FilterButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TopToolbar,
} from 'react-admin';

const bookingFilters = [
  <ReferenceInput source="serviceId" reference="services">
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={bookingFilters} />
    <ExportButton />
  </TopToolbar>
);

export const BookingList = () => (
  <List actions={<ListActions />} filters={bookingFilters}>
    <Datagrid rowClick="edit">
      <ReferenceField source="serviceId" reference="services">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="userId" reference="users">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="startTime" showTime />
      <DateField source="endTime" showTime />
      <TextField source="status" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput
        source="status"
        choices={[
          { id: 'PENDING', name: 'Pending' },
          { id: 'CONFIRMED', name: 'Confirmed' },
          { id: 'CANCELLED', name: 'Cancelled' },
          { id: 'COMPLETED', name: 'Completed' },
        ]}
      />
    </SimpleForm>
  </Edit>
);
