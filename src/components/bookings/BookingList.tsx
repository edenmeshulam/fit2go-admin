import { DateField, NumberField, ReferenceField, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

const filters = [<TextInput source="id" label="Search by ID" alwaysOn />, <TextInput source="status" label="Search by status" />];

export const BookingList = () => (
  <CustomList title="Bookings" filters={filters} sort={{ field: "created_at", order: "DESC" }}>
    <ReferenceField source="user_id" reference="users">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="business_id" reference="business">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="service_id" reference="services">
      <TextField source="name" />
    </ReferenceField>
    <TextField source="status" />
    <DateField source="booking_date" />
    <TextField source="time_slot" />
    <NumberField source="price" options={{ style: "currency", currency: "USD" }} />
    <DateField source="created_at" />
  </CustomList>
);
