import { UserButton } from '@clerk/clerk-react'

function Navbar() {
    return (
        <>
            <div className='max-w-4xl flex justify-end mx-auto px-4 py-4 '>
                <UserButton afterSignOutUrl='/' />
            </div>
        </>
    )
}

export default Navbar