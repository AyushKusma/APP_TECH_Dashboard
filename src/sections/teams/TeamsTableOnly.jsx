import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeams } from "../../redux/slices/TeamsSlice";
import { DeleteDialog } from "../../components/common/DeleteDialog";
import { DeleteContent } from "../../components/common/DeleteContent";
import { imageApiUrl } from "../../utils/apiConfig";
import { Preview } from "../../components/uploadImage/Preview";

const header = [
  { hd: "Name" },
  { hd: "Image" },
  { hd: "Phone" },
  { hd: "Email" },
  { hd: "Action" },
];
export const TeamsTableOnly = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const dispatch = useDispatch();

  const { teams } = useSelector((state) => state.teams);

  // Handle Change Page of table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value));
    setPage(0);
  };

  function toggleDeleteForm() {
    setOpenDeleteForm(!openDeleteForm);
  }

  function deleteOneData(deleteID) {
    dispatch(deleteTeams({ id: deleteID }));
  }

  return (
    <div className="shadow-xl">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-primary">
              {header.map((item, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      minWidth: 10,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {item.hd}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? teams.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : teams
            ).map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <img src={item.image} width={100} height={100} />
                  </TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <IconButton
                        sx={{
                          color: "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditData(item.id);
                          toggleOpenEdit();
                          setIsEdit(true);
                        }}
                      >
                        <MdModeEdit size={20} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation(),
                            setDeleteID(item.id),
                            toggleDeleteForm();
                        }}
                      >
                        <MdDelete size={20} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex">
          <TablePagination
            rowsPerPageOptions={[5, 10, { value: -1, label: "All" }]}
            page={page}
            count={teams.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
            className="w-full"
            sx={{
              fontFamily: "lato",
              backgroundColor: "#1f8da1",
              color: "white",
            }}
          />
        </div>
        <DeleteDialog
          open={openDeleteForm}
          title="Delete Category"
          toggleOpen={toggleDeleteForm}
        >
          <DeleteContent
            deleteWhat="this teams"
            toggleDeleteForm={toggleDeleteForm}
            deleteFunc={deleteOneData}
            delID={deleteID}
          />
        </DeleteDialog>
      </TableContainer>
    </div>
  );
};
