import { useField } from "formik";
import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";

export function CommonSelectInput({ children, ...data }: SelectProps) {
    const [field, meta] = useField(data);
    const isError = meta.touched && meta.error;
    return (
        <div className="flex flex-col gap-2">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
                <Select error={!!isError} {...data} {...field} id={data.name} variant="outlined">
                    {children}
                </Select>
                {isError && <FormHelperText error>{meta.error}</FormHelperText>}
            </FormControl>
        </div>
    );
}
