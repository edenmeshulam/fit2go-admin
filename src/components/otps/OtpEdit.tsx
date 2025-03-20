import { BooleanInput, Edit, ReferenceInput, SelectInput, SimpleForm, required } from "react-admin";

const typeChoices = [
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
];

export const OtpEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" validate={required()}>
        <SelectInput optionText="email" />
      </ReferenceInput>
      <SelectInput source="type" choices={typeChoices} validate={required()} />
      <BooleanInput source="isUsed" label="Used" />
      <BooleanInput source="isInvalid" label="Invalid" />
    </SimpleForm>
  </Edit>
);
