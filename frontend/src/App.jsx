import { Suspense, createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddBlog,
  AddRecipe,
  Blogs,
  Contact,
  DashboardBlogs,
  DashboardRecipes,
  EditBlog,
  EditRecipe,
  Error,
  Home,
  MyBlogs,
  MyRecipes,
  Profile,
  Recipe,
  SavedRecipes,
  SingleBlog,
  SingleRecipe,
  Users,
  SignIn,
  SignUp,
  CheckoutSuccess,
  CheckoutFailure,
} from "./pages";
import { ScrollToTop, PageLoading } from "./components";
import { RootLayout, DashboardLayout } from "./layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyContext = createContext();

function App() {
   const [userdata,setUserData] = useState([])

  return (
  <MyContext.Provider value={{userdata,setUserData}}>
<Router>
      <ScrollToTop />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/auth">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Dashboard */}
          <Route path="/dashboard" element={localStorage.getItem("role")=="admin"?<DashboardLayout />:<Error/>}>
            <Route path="users" element={<Users />} />
            <Route path="recipes" element={<DashboardRecipes />} />
            <Route path="blogs" element={<DashboardBlogs />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="recipe">
              <Route index element={<Recipe />} />
              <Route path=":id" element={<SingleRecipe />} />
              <Route path="saved" element={<SavedRecipes />} />
              <Route>
                <Route path="add" element={<AddRecipe />} />
                <Route path="my-recipes" element={<MyRecipes />} />
                <Route path="edit/:id" element={<EditRecipe />} />
              </Route>
            </Route>
            <Route path="contact" element={<Contact />} />
            <Route path="blog">
              <Route index element={<Blogs />} />
              <Route path=":id" element={<SingleBlog />} />
              <Route>
                <Route path="add" element={<AddBlog />} />
                <Route path="my-blogs" element={<MyBlogs />} />
                <Route path="edit/:id" element={<EditBlog />} />
              </Route>
            </Route>
            <Route>
              <Route path="profile" element={localStorage.getItem("id")?<Profile />:<Error/>} />
              <Route path="payment-success" element={<CheckoutSuccess />} />
              <Route path="payment-failed" element={<CheckoutFailure />} />
            </Route>
            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </MyContext.Provider>
  );
}

export default App;
