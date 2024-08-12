import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import categoryReducer from "./slices/CategorySlice";
import portfolioReducer from "./slices/PortfolioSlice";
import servicesReducer from "./slices/ServicesSlice";
import blogsReducer from "./slices/BlogsSlice";
import teamsReducer from "./slices/TeamsSlice";
import testimonialsReducer from "./slices/TestimonialsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    portfolio: portfolioReducer,
    services: servicesReducer,
    blogs: blogsReducer,
    teams: teamsReducer,
    testimonials: testimonialsReducer,
  },
});

export default store;
