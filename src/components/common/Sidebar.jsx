import React, { useContext } from "react";
import {
  TbLayoutDashboard,
  TbMail,
  TbArrowLeft,
  TbArrowRight,
  TbBrandTeams,
  TbUsersGroup,
  TbQuotes,
  TbLogout,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import { IconButton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";

const iconSize = 30;
const iconColor = "white";
const menuItems = [
  {
    title: "Dashboard",
    icon: <TbLayoutDashboard size={iconSize} color={iconColor} />,
    link: "/dashboard",
  },
  {
    title: "Categories",
    icon: (
      <CategoryIcon
        sx={{
          color: "white",
          fontSize: iconSize,
        }}
      />
    ),
    link: "/categories",
  },
  {
    title: "Portfolio",
    icon: (
      <FolderCopyIcon
        sx={{
          color: "white",
          fontSize: iconSize,
        }}
      />
    ),
    link: "/portfolio",
  },
  {
    title: "Services",
    icon: <RiCustomerService2Fill size={iconSize} color={iconColor} />,
    link: "/services",
  },
  {
    title: "Blogs",
    icon: <FaBookOpen size={iconSize} color={iconColor} />,
    link: "/blogs",
  },
  {
    title: "Teams",
    icon: <TbUsersGroup size={iconSize} color={iconColor} />,
    link: "/teams",
  },
  {
    title: "Testimonials",
    icon: <TbQuotes size={iconSize} color={iconColor} />,
    link: "/testimonials",
  },
];

export const Sidebar = () => {
  const { openSB, toggleSB } = useContext(SidebarContext);
  const location = useLocation();
  return (
    <div
      className={`flex flex-col fixed top-0 left-0 bg-primary transition-all 
        ${
          openSB
            ? "w-[18rem] h-[100%] shadow-2xl "
            : "w-[6rem] h-[100%] shadow-2xl"
        }`}
    >
      <div className="bg-gray-300 flex items-center justify-between px-2 transition-all">
        {openSB ? (
          <div className="py-4">
            <img
              src="/images/AppLogo.png"
              alt="App Technologies Logo"
              className="h-[4rem] py-1"
            />
          </div>
        ) : (
          <div className="w-[5rem] py-[0.5rem]">
            <img
              src="/images/AppLogoShort.png"
              alt="App Technologies Logo"
              className="h-[5rem] py-5"
            />
          </div>
        )}
        <IconButton
          onClick={toggleSB}
          sx={{
            color: "#1f8da1",
            backgroundColor: `${openSB ? "white" : null}`,
            boxShadow: `${openSB ? "5" : null}`,
          }}
          className="absolute left-7 transition-all"
        >
          {openSB ? <TbArrowLeft size={24} /> : <TbArrowRight size={24} />}
        </IconButton>
      </div>
      <ul
        className={`flex h-full p-4 ${
          openSB ? "justify-start" : "justify-center"
        }`}
      >
        <li className="flex flex-col w-full items-start gap-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={index}
                to={item.link}
                className={`flex w-full rounded-md ${
                  openSB ? "justify-start" : "justify-center p-2"
                } ${
                  isActive ? "bg-secondary" : ""
                } items-center hover:bg-secondary `}
              >
                <div
                  className={`flex justify-center rounded items-center ${
                    openSB ? `m-2 p-2` : `p-2 hover:bg-secondary`
                  }`}
                >
                  {item.icon}
                </div>
                <div
                  className={`text-start text-white ${
                    openSB ? "w-20" : "hidden"
                  }`}
                >
                  {item.title}
                </div>
              </Link>
            );
          })}
          <div
            className="w-full"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <Link
              to={"/login"}
              className={`flex w-full rounded-md ${
                openSB ? "justify-start" : "justify-center p-2"
              } items-center hover:bg-secondary `}
            >
              <div
                className={`flex justify-center rounded items-center ${
                  openSB ? `m-2 p-2` : `p-2 hover:bg-secondary`
                }`}
              >
                <TbLogout size={iconSize} color={iconColor} />
              </div>
              <div
                className={`text-start text-white ${
                  openSB ? "w-20" : "hidden"
                }`}
              >
                Log Out
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};
