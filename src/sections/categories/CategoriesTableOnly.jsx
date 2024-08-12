import React, { useEffect, useState } from "react";
import {
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../redux/slices/CategorySlice";
import { DeleteDialog } from "../../components/common/DeleteDialog";
import { DeleteContent } from "../../components/common/DeleteContent";

const header = [
  { hd: "Category" },
  { hd: "Name" },
  { hd: "Meta Slug" },
  { hd: "Meta Title" },
  { hd: "Meta Keywords" },
  { hd: "Meta Description" },
  { hd: "Action" },
];

export const CategoriesTableOnly = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const [activeTab, setActiveTab] = useState("");

  const dispatch = useDispatch();

  const { category, categoryLoading, categoryError } = useSelector(
    (state) => state.category
  );

  const mainCategory = category.filter((item) => item.category_id === null);

  useEffect(() => {
    setActiveTab(mainCategory[0]?.id);
  }, [category]);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

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
    dispatch(deleteCategory({ id: deleteID }));
  }

  function getCatergoryNameFromID(id) {
    const categoryNAME = category.filter((item) => item.id === id);
    return categoryNAME[0].name;
  }

  return (
    <>
      {categoryLoading ? (
        <LinearProgress />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-start gap-x-2">
            {[
              ...mainCategory,
              {
                id: null,
                name: "Main Categories",
              },
            ]?.map((item, index) => {
              return (
                <div className={`rounded border-b-2 border-primary`}>
                  <MenuItem
                    key={index}
                    sx={{
                      fontFamily: "lato",
                      borderRadius: 1,
                      backgroundColor: item?.id === activeTab ? "#1f8da1" : "",
                      color: item?.id === activeTab ? "white" : "",
                      ":hover": {
                        backgroundColor: "#1f8da1",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      handleChangeTab(item.id);
                      setPage(0);
                    }}
                  >
                    {item.name}
                  </MenuItem>
                </div>
              );
            })}
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="bg-primary">
                <TableRow>
                  {header.map((item, index) => {
                    return (
                      <TableCell
                        sx={{
                          minWidth: "10px",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "16px",
                        }}
                        key={index}
                      >
                        {item.hd}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? category
                      ?.filter((cat) => cat?.category_id === activeTab)
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : category
                )?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {item.category_id !== null
                          ? getCatergoryNameFromID(item.category_id)
                          : null}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.slug}</TableCell>
                      <TableCell>{item.meta_title}</TableCell>
                      <TableCell>{item.meta_keywords}</TableCell>
                      <TableCell>{item.meta_description}</TableCell>
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
            <div className="flex justify-end text-white">
              <TablePagination
                rowsPerPageOptions={[5, 10, { value: -1, label: "All" }]}
                page={page}
                count={
                  category?.filter((cat) => cat?.category_id === activeTab)
                    .length
                }
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
          </TableContainer>
          <DeleteDialog
            open={openDeleteForm}
            title="Delete Category"
            toggleOpen={toggleDeleteForm}
          >
            <DeleteContent
              deleteWhat="this category"
              toggleDeleteForm={toggleDeleteForm}
              deleteFunc={deleteOneData}
              delID={deleteID}
            />
          </DeleteDialog>
        </div>
      )}
    </>
  );
};
