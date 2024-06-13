import NavBar from "./_components/NavBar";

interface protectedLayoutProps {
    children: React.ReactNode;
}


const ProtectedLayout = ({children}: protectedLayoutProps) => {
    return (
        <div className="h-[800px] w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-t from-sky-500 to-blue-800">
            <NavBar/>
            {children}
        </div>
    )
}
export default ProtectedLayout