'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './css/login.css';
import anh from './img/0a1c1b70ebccc6ee21d0a5d8b40cec95 1.png';
import back from './img/back.png';
import logo from './img/shopping-cart-logo-21 2.png';

// Kiểu dữ liệu cho lỗi
interface Errors {
  email?: string;
  password?: string;
}

const Login =() => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  // Hàm kiểm tra định dạng email
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Xử lý khi submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = 'Email không được để trống';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!password) {
      newErrors.password = 'Password không được để trống';
    } else if (password.length < 6) {
      newErrors.password = 'Password phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('✅ Dữ liệu hợp lệ:', { email, password });
      alert('Đăng nhập thành công');
      router.push('/');
    }
  };

  // Xử lý thay đổi input
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setter(e.target.value);
    };

  return (
    <div className="container">
      <div className="left">
        <button className="btn-back">
          <Link href="/">
            <Image src={back} alt="mui ten" />
          </Link>
        </button>
        <Image src={anh} alt="Shopping" />
        <h2>Public Opinion Matter</h2>
      </div>

      <div className="right">
        <div className="logo">
          <Image src={logo} alt="logo" width={60} />
        </div>

        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Login Now!</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="signup-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
