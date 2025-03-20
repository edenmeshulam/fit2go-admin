import { DateField, ReferenceField, SelectInput, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

interface Notification {
  id: string;
  title: string;
  body: string;
  type: "all" | "specific";
  userId?: string;
  created_at: string;
}

const notificationTypes = [
  { id: "all", name: "All Users" },
  { id: "specific", name: "Specific User" },
];

const notificationFilters = [
  <TextInput source="title" label="Search by Title" alwaysOn />,
  <SelectInput source="type" label="Type" choices={notificationTypes} defaultValue="all" />,
  <TextInput source="body" label="Search in Message" />,
];

export const NotificationList = () => (
  <CustomList title="Push Notifications" sort={{ field: "created_at", order: "DESC" }} filters={notificationFilters}>
    <TextField source="title" />
    <TextField source="body" />
    <TextField source="type" emptyText="All Users" />
    <ReferenceField source="userId" reference="users" label="Target User" emptyText="All Users" link={false}>
      <TextField source="email" />
    </ReferenceField>
    <DateField source="created_at" showTime />
  </CustomList>
);
