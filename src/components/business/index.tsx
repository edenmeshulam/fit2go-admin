import { Box, Typography } from "@mui/material";
import {
  ArrayInput,
  AutocompleteInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";

const categoryChoices = [
  { id: "FITNESS", name: "Fitness" },
  { id: "WELLNESS", name: "Wellness" },
  { id: "SPA", name: "Spa" },
  { id: "MASSAGE", name: "Massage" },
  { id: "YOGA", name: "Yoga" },
  { id: "PILATES", name: "Pilates" },
  { id: "DANCE", name: "Dance" },
  { id: "MARTIAL_ARTS", name: "Martial Arts" },
];

const daysOfWeek = [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
  { id: "sunday", name: "Sunday" },
];

const OpeningHoursInput = () => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Opening Hours
    </Typography>
    {daysOfWeek.map((day) => (
      <TextInput
        key={day.id}
        source={`openingHours.${day.id}`}
        label={day.name}
        helperText="Format: HH:mm-HH:mm (e.g., 09:00-17:00)"
        defaultValue="09:00-17:00"
      />
    ))}
  </Box>
);

export const BusinessList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="category" />
      <TextField source="address" />
      <TextField source="phone" />
      <TextField source="email" />
      <TextField source="website" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BusinessCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline />
      <TextInput source="category" />
      <TextInput source="address" />
      <TextInput source="phone" />
      <TextInput source="email" />
      <TextInput source="website" />
      <ReferenceInput source="ownerId" reference="users">
        <AutocompleteInput optionText="email" />
      </ReferenceInput>
      <ArrayInput source="categories">
        <SimpleFormIterator>
          <SelectInput source="" choices={categoryChoices} />
        </SimpleFormIterator>
      </ArrayInput>
      <OpeningHoursInput />
    </SimpleForm>
  </Create>
);

export const BusinessEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline />
      <TextInput source="category" />
      <TextInput source="address" />
      <TextInput source="phone" />
      <TextInput source="email" />
      <TextInput source="website" />
      <ReferenceInput source="ownerId" reference="users">
        <AutocompleteInput optionText="email" />
      </ReferenceInput>
      <ArrayInput source="categories">
        <SimpleFormIterator>
          <SelectInput source="" choices={categoryChoices} />
        </SimpleFormIterator>
      </ArrayInput>
      <OpeningHoursInput />
    </SimpleForm>
  </Edit>
);
