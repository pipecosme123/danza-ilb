import { hiddenAlert, showAlert } from "../reducer/system"

export const showAlertThunk = ({ status, message }) => {
  return (dispatch) => {
    dispatch(showAlert({ status, message }))
    dispatch(hiddenAlert())
  }
}