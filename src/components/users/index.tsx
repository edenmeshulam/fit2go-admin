import {
  BooleanField,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EmailField,
  ExportButton,
  FilterButton,
  ImageField,
  ImageInput,
  List,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { UserRole, UserRoleLabel } from "../../interfaces/role";

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <SelectInput
    source="role"
    label="Role"
    choices={[
      { id: UserRole.USER, name: UserRoleLabel.USER },
      { id: UserRole.TRAINER, name: UserRoleLabel.TRAINER },
      { id: UserRole.BUSINESS_OWNER, name: UserRoleLabel.BUSINESS_OWNER },
      { id: UserRole.ADMIN, name: UserRoleLabel.ADMIN },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton filters={userFilters} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const UserList = () => (
  <List actions={<ListActions />} filters={userFilters}>
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <SelectField
        source="role"
        choices={[
          { id: UserRole.USER, name: UserRoleLabel.USER },
          { id: UserRole.TRAINER, name: UserRoleLabel.TRAINER },
          { id: UserRole.BUSINESS_OWNER, name: UserRoleLabel.BUSINESS_OWNER },
          { id: UserRole.ADMIN, name: UserRoleLabel.ADMIN },
        ]}
      />
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" type="email" />
      <TextInput source="password" type="password" />
      <TextInput source="governmentId" type="id" />
      <TextInput source="phone" type="phone" />
      <SelectInput
        source="role"
        choices={[
          { id: UserRole.USER, name: UserRoleLabel.USER },
          { id: UserRole.TRAINER, name: UserRoleLabel.TRAINER },
          { id: UserRole.BUSINESS_OWNER, name: UserRoleLabel.BUSINESS_OWNER },
          { id: UserRole.ADMIN, name: UserRoleLabel.ADMIN },
        ]}
      />
      <ImageInput source="pictureUrl" label="Profile Picture" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" type="email" />
      <TextInput source="password" type="password" />
      <SelectInput
        source="role"
        choices={[
          { id: UserRole.USER, name: UserRoleLabel.USER },
          { id: UserRole.TRAINER, name: UserRoleLabel.TRAINER },
          { id: UserRole.BUSINESS_OWNER, name: UserRoleLabel.BUSINESS_OWNER },
          { id: UserRole.ADMIN, name: UserRoleLabel.ADMIN },
        ]}
      />
      <ImageInput source="pictureUrl" label="Profile Picture" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
