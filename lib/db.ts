import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// if we do it normally, whenever we save the project in development, it'd run a hot reload and initialize prisma
// client every time, so we do this to store db variables in globalthis.prisma, so it checks in it first

/*
npm i -D prisma
npm i @prisma/client
npx prisma init => to create the prisma file
---
we are gonna need the db to fille the db url , use neon a free postgres db 

npx prisma generate => would generate the model when you create it 

- now we can use the lib folder to access the User model

npx prisma db push  => would sync the db with prisma

------ recreate the model using the auth.js (v5) not nextAuth.js(v4) doc
npm i @auth/prisma-adapter => to use prisma with nextAuth
npx prisma generate => to generate it inside the node modules
npx prisma db push => to push it to neon
----------------
we add password field to user model, and npm i bcrypt to encrypt the password
npm i @types/bcrypt



note: 
npx shadcn-ui@latest add form => install zod, react-hook-form
*/ 


/*
npm i react-icons
-------------------
! next auth (auth js.dev for v5 ) 
npm install next-auth@beta

*/ 