import { useState } from "react";
import { Create, required, SelectInput, SimpleForm, TextInput, useNotify, useRedirect } from "react-admin";

const notificationTypes = [
  { id: "all", name: "All Users" },
  { id: "specific", name: "Specific User" },
];

export const PushNotificationCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [type, setType] = useState("all");

  const onSuccess = () => {
    notify("Push notification sent successfully");
    redirect("list", "notifications");
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <SelectInput source="type" choices={notificationTypes} validate={required()} onChange={(e) => setType(e.target.value)} />
        {type === "specific" && <TextInput source="userId" validate={required()} helperText="Enter the user ID to send notification to" />}
        <TextInput source="title" validate={required()} helperText="Enter notification title" />
        <TextInput source="body" validate={required()} multiline rows={4} helperText="Enter notification message" />
      </SimpleForm>
    </Create>
  );
};
