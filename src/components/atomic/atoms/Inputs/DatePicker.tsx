import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
    name: string;
    control: Control<any>;
    value?: Date;
    onChange?: (date: Date) => void;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
    name,
    control,
    value,
    onChange,
    error = false,
    helperText = "",
    disabled = false,
}) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div>
                        <DayPicker
                            selected={value || field.value}
                            mode="single"
                            captionLayout="dropdown"
                            onDayClick={(date) => {
                                field.onChange(date);
                                onChange?.(date);
                            }}
                            disabled={disabled}
                            footer={
                                error &&
                                <p style={{ color: '#D32F2F' }}>
                                    {helperText}
                                </p>
                            }
                        />
                    </div>
                )}
            />
        </div>
    );
};

export default DatePicker;
