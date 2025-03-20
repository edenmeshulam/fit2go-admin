import { BooleanField, DateField, ReferenceField, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

export interface RefreshToken {
  id: string;
  token: string;
  userId: string;
  isRevoked: boolean;
  created_at: string;
  expires_at: string;
}

const refreshTokenFilters = [<TextInput source="token" label="Search by Token" alwaysOn />, <TextInput source="userId" label="User ID" />];

export const RefreshTokenList = () => (
  <CustomList title="Refresh Tokens" sort={{ field: "created_at", order: "DESC" }} filters={[]} resource="admin/refresh-tokens">
    <TextField source="token" />
    <ReferenceField source="userId" reference="users" link={false}>
      <TextField source="email" />
    </ReferenceField>
    <BooleanField source="isRevoked" label="Revoked" />
    <DateField source="created_at" showTime />
    <DateField source="expires_at" showTime />
  </CustomList>
);
