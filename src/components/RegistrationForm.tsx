// --- RegistrationForm.tsx ---
import React, { useState } from 'react';
import ValidatedInput, { ValidationRule } from './ValidatedInput';
import '../styles/Registration.css';
import ButtonWithLoading from "../components/loading/ButtonWithLoading";
import { LoadingBar } from "./loading";

const RegistrationForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [barLoading, setBarLoading] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const usernameRules: ValidationRule[] = [
        { test: (value: string) => value.length >= 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' },
        { test: (value: string) => /^[a-zA-Z0-9_]+$/.test(value), message: 'Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới' }
    ];

    const emailRules: ValidationRule[] = [
        { test: (value: string) => value.length > 0, message: 'Email không được để trống' },
        { test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Email không hợp lệ' }
    ];

    const passwordRules: ValidationRule[] = [
        { test: (value: string) => value.length >= 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { test: (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value), message: 'Mật khẩu phải chứa chữ hoa, chữ thường và số' }
    ];

    const confirmPasswordRules: ValidationRule[] = [
        { test: (value: string) => value === formData.password, message: 'Mật khẩu xác nhận không khớp' }
    ];

    const updateField = (field: keyof typeof formData) => (value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const allFieldsValid = (): boolean => {
        const validators = [
            ...usernameRules.map(r => r.test(formData.username)),
            ...emailRules.map(r => r.test(formData.email)),
            ...passwordRules.map(r => r.test(formData.password)),
            ...confirmPasswordRules.map(r => r.test(formData.confirmPassword))
        ];
        return validators.every(Boolean);
    };

    const handleSubmit = (): void => {
        setSubmitAttempted(true);
        if (!allFieldsValid()) return;
        setLoading(true);
        setBarLoading(true);
        setTimeout(() => {
            setLoading(false);
            setBarLoading(false);
            alert("Đã đăng ký thành công!");
        }, 2000);
    };

    return (
        <>
            <LoadingBar isLoading={barLoading} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                        <div className="form-container ">
                            <h2 className="title">Đăng ký tài khoản</h2>

                            <ValidatedInput
                                label="Tên đăng nhập"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                validationRules={usernameRules}
                                value={formData.username}
                                onChange={updateField('username')}
                                forceValidate={submitAttempted}
                            />

                            <ValidatedInput
                                label="Email"
                                type="email"
                                placeholder="Nhập email"
                                validationRules={emailRules}
                                value={formData.email}
                                onChange={updateField('email')}
                                forceValidate={submitAttempted}
                            />

                            <ValidatedInput
                                label="Mật khẩu"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                validationRules={passwordRules}
                                value={formData.password}
                                onChange={updateField('password')}
                                forceValidate={submitAttempted}
                            />

                            <ValidatedInput
                                label="Xác nhận mật khẩu"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                validationRules={confirmPasswordRules}
                                value={formData.confirmPassword}
                                onChange={updateField('confirmPassword')}
                                forceValidate={submitAttempted}
                            />

                            <ButtonWithLoading
                                className={`button`}
                                loading={loading}
                                onClick={handleSubmit}
                            >
                                Đăng ký
                            </ButtonWithLoading>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default RegistrationForm;
