/*
array of routes that are accessible to the public
do not require authentication
*/ 
export const publicRoutes = [
    "/", 
    "/auth/new-verification"
]


/*
array of routes that are used for authentication
these would redirect logged in users to settings
*/ 

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/*
the prefix of api authentication routes
routes that start with this are used for api authentication purposes

*/ 
export const apiAuthPrefix = "/api/auth"


/*
the default redirect after logging in
*/ 
export const defaultLoginRedirect = "/settings"