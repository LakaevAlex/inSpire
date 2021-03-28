import {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/authContext'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'
import debounce from '../utils/common'


const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //show error popup when error changes.
    useEffect(() => {
        message(error);
        clearError()
    }, [error])


    const handleEmailChange = async (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginClick = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {email, password})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    const handleSignupClick = async () => {
        try {
           await request('/api/auth/register', 'POST', {email, password})
        } catch (e) {

        }
    }

    

    return (
        <div>
            <div>AuthPage</div>
            <form>
                <label htmlFor="email"></label>
                <input
                    onChange={debounce(handleEmailChange, 1000)}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <label htmlFor="password"></label>
                <input 
                    onChange={handlePasswordChange}
                    name="password" 
                    type="password"
                    placeholder="pwd"
                />
                <button 
                    onClick={handleLoginClick}
                    disabled={loading}
                >
                    Login
                </button>
                <button 
                    onClick={handleSignupClick}
                    disabled={loading}
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default AuthPage;