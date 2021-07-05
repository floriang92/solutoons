import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
function Table(props) {

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(even)": {
              backgroundColor: "#EEEEEE",
            },
            "&:nth-child(odd)": {
              backgroundColor: "#EEEEEE",
            },
          },
        },
        MUIDataTableBodyCell: {
          root: {
            "&:nth-child(n)": {
              color: "black",
            },
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
            width: "25em",
          },
        },
        MuiToolbar: {
          root: {
            backgroundColor: "#73ba9b",
            color: "white",
          },
        },
        MuiTableFooter: {
          root: {
            backgroundColor: "#73ba9b",
            color: "white",
          },
        },
      },
    });

  const columns = [
    // {
    //   name: "id",
    //   label: "id",
    //   options: {
    //     display: "excluded",
    //     filter: false,
    //     sort: false,
    //   },
    // },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "url",
      label: "URL",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    print: false,
    filter: true,
    viewColumns: false,
    filterType: 'checkbox',
  };

  return (
    <div>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Mes videos"}
          data={props.data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default Table;
