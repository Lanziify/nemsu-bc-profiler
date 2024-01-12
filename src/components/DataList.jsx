import React from "react";
import DataTable from "react-data-table-component";
import Preloader from "./Preloader";

const DataList = (props) => {
  const columns = [
    {
      name: "Document ID",
      selector: (data) => data.docId.toUpperCase(),
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Name",
      selector: (data) => getName(data),
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Email Address",
      selector: (data) => data.personalData.email,
      sortable: true,
      wrap: true,
      hide: "md",
      grow: 2,
    },
    {
      name: "Home Address",
      selector: (data) => data.personalData.homeAddress,
      sortable: true,
      wrap: true,
      hide: "lg",
      grow: 2,
    },
    {
      name: "Contact",
      selector: (data) => data.personalData.contact,
      sortable: true,
      wrap: true,
      hide: "sm",
    },
    {
      name: "Age",
      selector: (data) => data.personalData.age,
      sortable: true,
      wrap: true,
      hide: "lg",
    },
    {
      name: "Sex",
      selector: (data) => sentenceCase(data.personalData.sex),
      sortable: true,
      wrap: true,
      hide: "lg",
    },
    {
      name: "Course",
      selector: (data) => data.personalData.course.toUpperCase(),
      sortable: true,
      wrap: true,
      // hide: "md",
      right: true,
    },
  ];

  const sentenceCase = (str) => {
    return str.slice("").charAt(0).toUpperCase() + str.slice(1);
  };

  const getName = (data) => {
    const lastName = sentenceCase(data.personalData.name.lastName);
    const firstName = sentenceCase(data.personalData.name.firstName);
    const middleInitial = data.personalData.name.middleInitial.toUpperCase();
    return middleInitial
      ? lastName + ", " + firstName + ", " + middleInitial
      : lastName + ", " + firstName;
  };

  const tableStyle = {
    headRow: {
      style: {
        // backgroundColor: "#3b82f6",
        fontWeight: "bold",
        // color: "#FFFF",
      },
    },
    noData: {
      style: {},
    },
    pagination: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  if (props.loading) return <Preloader />;

  return (
    <DataTable
      title="Student Profile Records"
      columns={columns}
      data={props.data}
      striped={true}
      pointerOnHover
      highlightOnHover
      customStyles={tableStyle}
      pagination
      responsive={true}
      onRowClicked={props.onRowClicked}
    />
  );
};

export default DataList;
