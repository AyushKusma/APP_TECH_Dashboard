import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { SidebarContext } from "./context/SidebarContext";
import { SidebarLayout } from "./layout/SidebarLayout";
import { Blogs } from "./pages/Blogs";
import { Categories } from "./pages/Categories";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Portfolio } from "./pages/Portfolio";
import { Services } from "./pages/Services";
import { Teams } from "./pages/Teams";
import { Testimonials } from "./pages/Testimonials";
import { useDispatch, useSelector } from "react-redux";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { checkToken } from "./redux/slices/AuthSlice";
import { GuestRoute } from "./components/routes/GuestRoute";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
  },
});

function App() {
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(
    JSON.parse(localStorage.getItem("openSidebar")) || false
  );

  const { isLoading, userToken } = useSelector((state) => state.auth);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  useEffect(() => {
    if (openSidebar === true) {
      document.documentElement.classList.add(true);
    } else {
      document.documentElement.classList.remove(true);
    }
    localStorage.setItem("openSidebar", openSidebar);
  }, [openSidebar]);

  // console.log(userToken);

  return (
    <ThemeProvider theme={theme}>
      <SidebarContext.Provider
        value={{ openSB: openSidebar, toggleSB: toggleSidebar }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Dashboard />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Categories />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Portfolio />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Services />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Blogs />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Teams />
                  </SidebarLayout>
                }
              />
            }
          />
          <Route
            path="/testimonials"
            element={
              <ProtectedRoute
                element={
                  <SidebarLayout>
                    <Testimonials />
                  </SidebarLayout>
                }
              />
            }
          />
        </Routes>
      </SidebarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
