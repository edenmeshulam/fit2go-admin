import { BooleanField, BooleanInput, DateField, ReferenceField, SelectInput, TextField, TextInput } from "react-admin";
import { CustomList } from "../common/CustomList";

interface Otp {
  id: string;
  code: string;
  type: "email" | "phone";
  userId: string;
  isUsed: boolean;
  isInvalid: boolean;
  created_at: string;
  expires_at: string;
}

const typeChoices = [
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
];

const otpFilters = [
  <TextInput source="code" label="Search by Code" alwaysOn />,
  <SelectInput source="type" label="Type" choices={typeChoices} defaultValue="email" />,
  <BooleanInput source="isUsed" label="Used" defaultValue={false} />,
  <BooleanInput source="isInvalid" label="Invalid" defaultValue={false} />,
];

export const OtpList = () => (
  <CustomList title="OTPs" sort={{ field: "created_at", order: "DESC" }} filters={otpFilters}>
    <TextField source="code" />
    <TextField source="type" emptyText="-" />
    <ReferenceField source="userId" reference="users" link={false}>
      <TextField source="email" />
    </ReferenceField>
    <BooleanField source="isUsed" label="Used" looseValue />
    <BooleanField source="isInvalid" label="Invalid" looseValue />
    <DateField source="created_at" showTime />
    <DateField source="expires_at" showTime />
  </CustomList>
);
