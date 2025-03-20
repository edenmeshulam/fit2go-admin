import { BooleanInput, Edit, ReferenceInput, SelectInput, SimpleForm, required } from "react-admin";

const statusChoices = [
  { id: "active", name: "Active" },
  { id: "revoked", name: "Revoked" },
];

export const RefreshTokenEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" validate={required()}>
        <SelectInput optionText="email" />
      </ReferenceInput>
      <BooleanInput source="isRevoked" label="Revoked" />
    </SimpleForm>
  </Edit>
);
