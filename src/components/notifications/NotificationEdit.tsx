import { Edit, SelectInput, SimpleForm, TextInput, required } from "react-admin";

const notificationTypes = [
  { id: "all", name: "All Users" },
  { id: "specific", name: "Specific User" },
];

export const NotificationEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput source="type" choices={notificationTypes} validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="body" multiline rows={4} validate={required()} />
    </SimpleForm>
  </Edit>
);
