import { useField } from "formik";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export function CommonTextInput({ ...data }: TextFieldProps) {
    const [field, meta] = useField(data);
    const isError = meta.touched && meta.error;
    return (
        <div className="flex flex-col gap-2">
            <TextField
                error={!!isError}
                {...data}
                {...field}
                id={data.name}
                variant="outlined"
                helperText={isError && meta.error}
            />
        </div>
    );
}
