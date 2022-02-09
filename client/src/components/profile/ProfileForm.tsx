import { TextFieldProps } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
import { setUser } from "../../actions/user";

const ProfileForm = (props: any) => {
  const userInfo = props.userInfo;
  const [name, setName] = useState(userInfo.name);
  const [secondName, setSecondName] = useState(userInfo.secondName);
  const [birthday, setBirthday] = useState(userInfo.birthday);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(()=>{
    setName(userInfo.name);
    setSecondName(userInfo.secondName);
    setBirthday(userInfo.birthday);
  } , [userInfo])

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeSecondName = (e: any) => {
    setSecondName(e.target.value);
  };

  const submitChanges = () => {
    dispatch(
      setUser({
        name: name,
        secondName: secondName,
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        birthday: birthday,
      })
    );
    props.onClose();
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
            onChange={onChangeName}
            color="info"
            value={name}
          />
          <TextField
            margin="dense"
            id="secondName"
            label={t("profile.secondName")}
            type="email"
            fullWidth
            variant="outlined"
            onChange={onChangeSecondName}
            color="info"
            value={secondName}
          />
          <DesktopDatePicker
            label={t("profile.dateOfBirth")}
            inputFormat="dd/MM/yyyy"
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            value={birthday}
            renderInput={(params: TextFieldProps) => (
              <TextField
                id="birthday"
                color="info"
                value={birthday}
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
          <Button onClick={submitChanges} color="info">
            {t("profile.submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProfileForm;
