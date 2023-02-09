import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../store/store';
import Button from '../../../../ui/Button/Button';
import HTag from '../../../../ui/Htag/HTag';
import Input from '../../../../ui/Input/Input';
import PTag from '../../../../ui/PTag/PTag';
import { login, registration } from '../services/userAPI';
import { fetchedUser, fetchingUser, fetchUser } from '../services/userSlice';


import styles from './AuthForm.module.css';

const AuthForm = () => {

    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
   
    const sing = async () => {
        try {
            dispatch(fetchingUser());
            if (register) {
                const response = await registration(email, password);
                dispatch(fetchUser({user: response, auth: true}));
                navigate('/');

            } else {
                const response = await login(email, password);
                dispatch(fetchUser({user: response, auth: true}));
                navigate('/');
            }
        } catch (error) {
            dispatch(fetchedUser());
        }
    }

    return (
        <div className={styles.form}>
            <HTag htag='h2'>{register ? 'Зарегистрироваться' : 'Войти'}</HTag>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Введите вашу почту'/>
            <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Введите ваш пароль'/>
            {register 
            ? 
                <div className={styles.agree}>
                    <PTag size='14'>Подтверждаю согласие на обработку данных</PTag> 
                    <input id='check' type='checkbox'/>
                    <label htmlFor="check"></label>
                </div> 
                :
                null    
            }
            <div className={styles.submit}>
                {register 
                    ? 
                    <PTag size='16'>
                        У вас уже есть аккаунт? <span onClick={() => setRegister(false)} className={styles.swap}>Войти</span>
                    </PTag> 
                    :
                    <PTag size='16'>
                        У вас нет аккаунта? <span onClick={() => setRegister(true)} className={styles.swap}>Зарегистрироваться</span>
                    </PTag>
                }
                <Button onClick={sing}>{register ? 'Зарегистрироваться' : 'Войти'}</Button>
            </div>

        </div>
    );
};

export default AuthForm;
