// --- ValidatedInput.tsx ---
import React, { useState, useEffect } from 'react';
import '../styles/Registration.css';

export interface ValidationRule {
    test: (value: string) => boolean;
    message: string;
}

interface ValidatedInputProps {
    label: string;
    type: string;
    placeholder: string;
    validationRules: ValidationRule[];
    value: string;
    onChange: (value: string) => void;
    forceValidate?: boolean;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
                                                           label,
                                                           type,
                                                           placeholder,
                                                           validationRules,
                                                           value,
                                                           onChange,
                                                           forceValidate = false
                                                       }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    const validate = () => {
        const newErrors = validationRules
            .filter(rule => !rule.test(value))
            .map(rule => rule.message);
        setErrors(newErrors);
    };

    useEffect(() => {
        if (touched || forceValidate) {
            validate();
        }
    }, [value, validationRules, touched, forceValidate]);

    const handleBlur = (): void => {
        setTouched(true);
        setFocused(false);
    };

    const handleFocus = (): void => {
        setFocused(true);
    };

    const getInputClassName = (): string => {
        let className = 'input';
        if (focused) className += ' input-focus';
        if (errors.length > 0 && (touched || forceValidate)) className += ' input-error';
        return className;
    };

    return (
        <div className="input-group">
            <label className="label">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={getInputClassName()}
            />
            {(errors.length > 0 && (touched || forceValidate)) && (
                <div>
                    {errors.map((error, idx) => (
                        <p key={idx} className="error-message">{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ValidatedInput;
