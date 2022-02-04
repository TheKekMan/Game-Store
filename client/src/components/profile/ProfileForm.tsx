import { TextFieldProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  AdapterDateFns,
  Button,
  DesktopDatePicker,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LocalizationProvider,
  TextField,
} from "../../mui";
import { RootState } from "../../reducers";

const ProfileForm = (props: any) => {
  const userInfo = props.userInfo;
  const [value, setValue] = useState(new Date(userInfo.birthday));
  const { t } = useTranslation();

  useEffect(() => {
    setValue(new Date(userInfo.birthday));
  }, [userInfo.birthday]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={props.open} onClose={props.onClose} sx={{ gap: "1rem" }}>
        <DialogTitle>{t("profile.editProfile")}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label={t("profile.name")}
            type="text"
            fullWidth
            variant="outlined"
            color="info"
            defaultValue={userInfo.name}
          />
          <TextField
            margin="dense"
            id="name"
            label={t("profile.secondName")}
            type="email"
            fullWidth
            variant="outlined"
            color="info"
            defaultValue={userInfo.second_name}
          />
          <DesktopDatePicker
            label={t("profile.dateOfBirth")}
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params: TextFieldProps) => (
              <TextField
                color="info"
                {...params}
                sx={{ marginTop: "8px", marginBottom: "4px" }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="error">
            {t("profile.cancel")}
          </Button>
          <Button onClick={props.onClose} color="info">
            {t("profile.submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProfileForm;
