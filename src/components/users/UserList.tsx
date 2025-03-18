import { BooleanField, DateField, EmailField, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

const filters = [<TextInput source="name" label="Search by name" alwaysOn />, <TextInput source="email" label="Search by email" />];

export const UserList = () => (
  <CustomList title="Users" filters={filters} sort={{ field: "created_at", order: "DESC" }}>
    <TextField source="name" />
    <EmailField source="email" />
    <TextField source="phone" />
    <BooleanField source="is_active" />
    <DateField source="last_login" />
    <DateField source="created_at" />
  </CustomList>
);
