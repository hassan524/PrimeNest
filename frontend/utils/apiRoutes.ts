export const apiRoute = {
    login: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    sign: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    AddProperty: `${process.env.NEXT_PUBLIC_BACKEND_URL}/prop/addProp`,
    GetProperty: `${process.env.NEXT_PUBLIC_BACKEND_URL}/prop/getProp`,
    AddToFav: `${process.env.NEXT_PUBLIC_BACKEND_URL}/prop/FavProp`,
    GetProps: `${process.env.NEXT_PUBLIC_BACKEND_URL}/prop/GetProps`,
    GetUserProps: `${process.env.NEXT_PUBLIC_BACKEND_URL}/prop/GetUserProps`,
};
