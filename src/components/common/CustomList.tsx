import { Box, Card, CardContent, Paper, Typography, useTheme } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { CreateButton, DatagridConfigurable, ExportButton, FilterButton, List, ListProps, SelectColumnsButton, Title, TopToolbar } from "react-admin";

interface CustomListProps extends Omit<ListProps, "children"> {
  children: ReactNode;
  title: string;
  filters?: ReactElement | ReactElement[];
}

const ListActions = ({ filters }: { filters?: ReactElement | ReactElement[] }) => (
  <TopToolbar
    sx={{
      gap: 1,
      "& .RaButton-root": {
        borderRadius: 1,
      },
    }}
  >
    <FilterButton />
    <CreateButton />
    <ExportButton />
    <SelectColumnsButton />
  </TopToolbar>
);

export const CustomList = ({ children, title, filters, ...rest }: CustomListProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Title title={title} />
      <Card
        sx={{
          mt: 2,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          backgroundImage: "none",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              pb: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)"
                    : "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </Typography>
            <ListActions filters={filters} />
          </Box>
          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              border: `1px solid ${theme.palette.divider}`,
              "& .RaDatagrid-headerCell": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                color: theme.palette.text.secondary,
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                },
              },
              "& .RaDatagrid-row": {
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                  cursor: "pointer",
                },
              },
              "& .RaDatagrid-rowCell": {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <List
              {...rest}
              actions={<ListActions filters={filters} />}
              filters={filters}
              sx={{
                "& .RaList-main": {
                  boxShadow: "none",
                },
                "& .RaList-content": {
                  borderRadius: 2,
                  border: "none",
                },
              }}
            >
              <DatagridConfigurable
                sx={{
                  "& .RaDatagrid-headerCell": {
                    padding: "16px",
                  },
                  "& .RaDatagrid-rowCell": {
                    padding: "16px",
                  },
                  "& .column-undefined > *": {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  },
                }}
                rowClick="edit"
                bulkActionButtons={false}
              >
                {children}
              </DatagridConfigurable>
            </List>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};
