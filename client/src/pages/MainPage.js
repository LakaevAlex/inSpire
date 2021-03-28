import useHttp from '../hooks/http.hook';
import AuthContext from '../context/authContext'
import {useState, useEffect, useContext} from 'react'


const MainPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(AuthContext)

    const test = async () => {

        try {
            const data = await request('/api/some/test',
             'POST', 
             {email: 'ajajaj@mai.ru',
              password: '901890189'
            }, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {
    
        }
    }
   
    return (
        <div onClick={test}>MainPage</div>
    )
}

export default MainPage;