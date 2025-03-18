import { DateField, EmailField, NumberField, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

const filters = [<TextInput source="name" label="Search by name" alwaysOn />, <TextInput source="email" label="Search by email" />];

export const BusinessList = () => (
  <CustomList title="Businesses" filters={filters} sort={{ field: "created_at", order: "DESC" }}>
    <TextField source="name" />
    <EmailField source="email" />
    <TextField source="phone" />
    <TextField source="address" />
    <TextField source="city" />
    <TextField source="state" />
    <TextField source="zip" />
    <NumberField source="rating" />
    <DateField source="created_at" />
  </CustomList>
);
