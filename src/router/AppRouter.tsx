// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import GlobalLayout from "../ctx/GlobalLayout";
// import Login from "../pages/auth/login";
// import Register from "../pages/auth/register";
// import ProtectedRoute from "../ctx/ProtectedRoute";
// import ProtectedLayout from "../ctx/ProtectedLayout";
// import Information from "../pages/home/profile/Information";
// import Activities from "../pages/home/profile/Activities";
// import Settings from "../pages/home/settings";
// import Notifications from "../pages/home/notifications";
// import Announce from "../pages/home/announce";
// import Attestations from "../pages/home/attestations";
// import PharmaciesAvendre from "../pages/home/pharmaciesAvendre";
// import MyPharmacie from "../pages/home/myPharmacie";
// import Cotisation from "../pages/home/cotisation";
// // ...other imports

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <GlobalLayout>
//               <Login />
//             </GlobalLayout>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <GlobalLayout>
//               <Register />
//             </GlobalLayout>
//           }
//         />

//         {/* Protected routes */}
//         <Route
//           element={
//             <GlobalLayout>
//               <ProtectedRoute>
//                 <ProtectedLayout />
//               </ProtectedRoute>
//             </GlobalLayout>
//           }
//         >
//           {/* 🔹 Default redirect */}
//           <Route path="/" element={<Navigate to="/profile/informations-personnelles" replace />} />

//           {/* Profile */}
//           <Route path="/profile/informations-personnelles" element={<Information />} handle={{ title: "Informations personnelles" }} />
//           <Route path="/profile/activities" element={<Activities />} handle={{ title: "Activités" }}/>

//           {/* Other pages */}
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/announce" element={<Announce/>} />
//           <Route path="/attestations" element={<Attestations />} />
//           <Route path="/pharmacies-à-vendre" element={<PharmaciesAvendre />} />
//           <Route path="/ma-pharmacie" element={<MyPharmacie />} />
//           <Route path="/cotisation" element={<Cotisation />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import GlobalLayout from "../ctx/GlobalLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ProtectedRoute from "../ctx/ProtectedRoute";
import ProtectedLayout from "../ctx/ProtectedLayout";
import Information from "../pages/home/profile/Information";
import Activities from "../pages/home/profile/Activities";
import Notifications from "../pages/home/notifications";
import Announce from "../pages/home/announce";
import Attestations from "../pages/home/attestations";
import PharmaciesAvendre from "../pages/home/pharmaciesAvendre";
import MyPharmacie from "../pages/home/myPharmacie";
import Cotisation from "../pages/home/cotisation";
import FailedPaiment from "../components/paiment-status/failed-paiment";
import Recu from "../components/paiment-status/recu";
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GlobalLayout>
        <Login />
      </GlobalLayout>
    ),
  },
  {
    path: "/inscription",
    element: (
      <GlobalLayout>
        <Register />
      </GlobalLayout>
    ),
  },

  {
    element: (
      <GlobalLayout>
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      </GlobalLayout>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/profile/informations-personnelles" replace />,
      },
      {
        path: "/profile/informations-personnelles",
        element: <Information />,
        handle: { title: "Informations personnelles" },
      },
      {
        path: "/profile/activities",
        element: <Activities />,
        handle: { title: "Activités" },
      },
   
      {
        path: "/notifications",
        element: <Notifications />,
        handle: { title: "Notifications" },
      },
      {
        path: "/announce",
        element: <Announce />,
        handle: { title: "Annonces" },
      },
      {
        path: "/attestations",
        element: <Attestations />,
        handle: { title: "Attestations" },
      },
      {
        path: "/pharmacies-à-vendre",
        element: <PharmaciesAvendre />,
        handle: { title: "Pharmacies à vendre" },
      },
      {
        path: "/ma-pharmacie",
        element: <MyPharmacie />,
        handle: { title: "Ma pharmacie" },
      },
      {
        path: "/cotisation",
        element: <Cotisation />,
        handle: { title: "Cotisation" },
      },
      {
        path: "/failed_check",
        element: <FailedPaiment />,
      },
       {
        path: "/recu_check",
        element: <Recu />,
      },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
