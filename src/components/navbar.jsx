export default function navbar({isloggedin}){
return (
    <>
    <nav>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            {isloggedin ? (
                <li>Logout</li>
            ) : (
                <li>Login</li>
            )}
        </ul>
    </nav>
    </>
)
}