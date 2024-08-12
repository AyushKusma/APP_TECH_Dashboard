import React, { useState } from "react";
import { SearchBar } from "../form/SearchBar";
import { DropdownField } from "../common/DropdownField";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { IoEllipsisVertical, IoRefresh } from "react-icons/io5";
import { AddDialog } from "../common/AddDialog";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaFileExport, FaFileImport, FaPrint } from "react-icons/fa6";
import { DateRangeFilter } from "./DateRangeFilter";
import { DateFormatter } from "../utils/DateFormatter";

export const TableTop = ({
  status,
  exportFile,
  importFile,
  print,
  contentToPrint,
  searchQuery,
  setSearchQuery,
  setSearchStatus,
  setStartDate,
  setEndDate,
  resetFilters,
}) => {
  const [openDateRange, setDateRange] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const open = Boolean(openOption);

  // Open date range
  function toggleOpenDateRange() {
    setDateRange(!openDateRange);
  }

  const Schema = Yup.object().shape({
    // name: Yup.string().required("Customer name is required"),
    // time: Yup.date().required("Time is required"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
    // defaultValues,
  });

  const { handleSubmit, reset } = methods;

  // useEffect(() => {
  //     reset(defaultValues);
  // }, [defaultValues, reset]);

  const onSubmit = (data) => {
    // Formatted date in '0000-00-00' format
    const formatStartDate = DateFormatter(data.startDate);
    const formatEndDate = DateFormatter(data.endDate);
    setStartDate(formatStartDate);
    setEndDate(formatEndDate);
    // Add form submission logic here
    reset();
  };

  const handleClick = (event) => {
    setOpenOption(event.currentTarget);
  };

  const handleClose = () => {
    setOpenOption(false);
  };

  return (
    <div className="flex gap-2 justify-center flex-col">
      <div className="flex gap-2 justify-center">
        <div className="flex-[2]">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="flex-1">
          <DropdownField
            name="itemsDropdown"
            label="Filter by Status"
            data={status}
            onItemClicked={setSearchStatus}
          />
        </div>
        {/* Filter by date */}
        <div
          className="flex-1 flex items-center justify-center bg-gray-300 rounded-md shadow-md transition-all cursor-pointer hover:bg-gray-400 hover:text-white"
          onClick={() => {
            setDateRange(!openDateRange);
          }}
        >
          Filter by date
        </div>
        <Tooltip title="Reset Filters" placement="bottom-start" arrow>
          <div
            data-tooltip-target="tooltip"
            className="flex justify-center items-center p-2 bg-gray-300 transition-all hover:bg-gray-400 hover:text-gray-100 rounded-md shadow-md cursor-pointer"
            onClick={resetFilters}
          >
            <IoRefresh size={24} />
          </div>
        </Tooltip>
        <div
          className="flex justify-center items-center p-2 bg-gray-300 transition-all hover:bg-gray-400 hover:text-gray-100 rounded-md shadow-md cursor-pointer"
          onClick={handleClick}
        >
          <IoEllipsisVertical size={24} />
        </div>
        <Menu
          anchorEl={openOption}
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onChange={(e) => importFile(e)}>
            <div>
              <input
                type="file"
                id="importFile"
                className="hidden"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <label
                className="flex justify-center items-center gap-2"
                htmlFor="importFile"
              >
                <span>
                  <FaFileImport />
                </span>
                Import
              </label>
            </div>
          </MenuItem>
          <MenuItem onClick={exportFile}>
            <div className="flex justify-center items-center gap-2">
              <span>
                <FaFileExport />
              </span>
              Export
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              print(null, () => contentToPrint.current);
            }}
          >
            <div className="flex justify-center items-center gap-2">
              <span>
                <FaPrint />
              </span>
              Print
            </div>
          </MenuItem>
        </Menu>
      </div>

      <AddDialog
        open={openDateRange}
        title="Select Date Range"
        toggleOpen={toggleOpenDateRange}
      >
        <DateRangeFilter
          methods={methods}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          toggleOpenDateRange={toggleOpenDateRange}
        />
      </AddDialog>
    </div>
  );
};
