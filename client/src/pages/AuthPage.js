import {useState, useEffect} from 'react'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'
import useStorage from '../hooks/storage.hook'
import {debounce} from '../utils/common'


const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const {saveToStorage, getFromStorage, clearStorage} = useStorage;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //show error popup when error changes.
    useEffect(() => {
        message(error);
        clearError()
    }, [error])


    const handleEmailChange = async (e) => {
        setEmail(e.target.value);
        // send request to check email is free before submit.
        try {
            const data = await request('/api/auth/check', 'POST', {email: e.target.value})
            if (data.error) {
                message(data.error);
            }
        } catch (e) {

        }
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginClick = async () => {
        try {
            const user = await request('/api/auth/login', 'POST', {email, password})
            saveToStorage('user', data);
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