import { useState } from 'react';
import Button from '../../../../ui/Button/Button';
import HTag from '../../../../ui/Htag/HTag';
import Input from '../../../../ui/Input/Input';
import PTag from '../../../../ui/PTag/PTag';
import styles from './AuthForm.module.css';

const AuthForm = () => {

    const [register, setRegister] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                <Button>{register ? 'Зарегистрироваться' : 'Войти'}</Button>
            </div>

        </div>
    );
};

export default AuthForm;