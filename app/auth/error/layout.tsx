import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full flex items-center justify-center bg-gradient-to-t from-sky-500 to-blue-800'>
        {children}
        </div>
    );
};

export default AuthLayout;