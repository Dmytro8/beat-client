import React, { useState, useEffect, useContext } from "react";
import MaterialTable, { Column } from "material-table";
import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";

interface Row {
  title: string;
  artist: string;
  price: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
  // actions: any;
}

export const SongsTable = () => {
  const [statePlayer, dispatchPlayer]: any = useContext(PlayerContext);
  const [tableData, setTableData] = useState<TableState>({
    columns: [
      { title: "Title", field: "title" },
      { title: "Artist", field: "artist" },
      { title: "Price", field: "price", type: "numeric" },
    ],
    data: [{ title: "", artist: "", price: 0 }],
    // actions: [
    //   {
    //     icon: "save",
    //     tooltip: "Save User",
    //     onClick: (event: any, rowData: any) =>
    //       alert("You saved " + rowData.name),
    //   },
    // ],
  });

  useEffect(() => {
    setTableData((prevState) => {
      const data = [...prevState.data];
      return { ...prevState, data };
    });
    return () => {};
  }, []);

  return (
    <MaterialTable
      title="Songs"
      // columns={tableData.columns}
      // data={tableData.data}
      columns={[
        // {
        //   title: "Avatar",
        //   field: "avatar",
        //   render: (rowData) => (
        //     <img
        //       style={{ height: 36, borderRadius: "50%" }}
        //       src={rowData.avatar}
        //     />
        //   ),
        // },
        // { title: "Id", field: "id" },
        { title: "Name", field: "name" },
        { title: "Artist", field: "artist" },
        { title: "Price", field: "price" },
      ]}
      data={(query) =>
        new Promise((resolve, reject) => {
          let url = "https://beatstart.herokuapp.com/audio/getPage?";
          url += "pageSize=" + query.pageSize;
          url += "&pageCount=" + (query.page + 1);
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result.list,
                page: result.pageCount - 1,
                totalCount: result.total,
              });
            });
        })
      }
      options={{
        actionsColumnIndex: -1,
        sorting: true,
      }}
      localization={{
        body: {
          editRow: { deleteText: "Are you sure you want to delete this song?" },
        },
      }}
      editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              // if (oldData) {
              //   setTableData((prevState) => {
              //     const data = [...prevState.data];
              //     data[data.indexOf(oldData)] = newData;
              //     return { ...prevState, data };
              //   });
              // }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              // setTableData((prevState) => {
              //   const data = [...prevState.data];
              //   data.splice(data.indexOf(oldData), 1);
              //   return { ...prevState, data };
              // });
            }, 600);
          }),
      }}
    />
  );
};
