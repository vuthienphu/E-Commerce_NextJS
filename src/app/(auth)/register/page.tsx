'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import './css/signup.css';
import anh from './img/0a1c1b70ebccc6ee21d0a5d8b40cec95 1.png';
import back from './img/back.png';
import logo from './img/shopping-cart-logo-21 2.png';

// ✅ Định nghĩa kiểu dữ liệu cho form
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ✅ Kiểu cho lỗi
interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ Khai báo kiểu cho e
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // ✅ Khai báo kiểu cho e
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("✅ Signup success!");
      console.log(formData);
      router.push('/'); 
    }
  };

  return (
    <div className="container">
      <div className="left">
        <button className="btn-back">
          <Link href="/"><Image src={back} alt="mui ten" /></Link>
        </button>
        <Image src={anh} alt="Shopping" />
        <h2>Public Opinion Matter</h2>
      </div>

      <div className="right">
        <div className="logo">
          <Image src={logo} alt="logo" width={60} />
        </div>
        <div className="form-box">
          <h2>Get Started Now!</h2>
          <span>Create Your Account Here</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
