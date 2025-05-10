import ShipEditPage from "@/pages/ShipEditPage";
import ShipListPage from "@/pages/ShipListPage";
import ShipCreatePage from "@/pages/ShipCreatePage";

export const privateRoutes = [
    {
        path: "/ships",
        element: <ShipListPage />,
    },
    {
        path: "/ships/create",
        element: <ShipCreatePage />,
    },
    {
        path: "/ships/edit/:id",
        element: <ShipEditPage />,
    },
];
