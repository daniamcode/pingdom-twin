import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadStatus } from "../actions/statusActions";
import { showStatus } from "../actions/showStatusActions";
import Spinner from "./Spinner";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Status = ({ show, status, isLoading }) => {
  let [url, setUrl] = useState("");
  let dispatch = useDispatch();

  function onFieldChange(value, setValue) {
    setValue(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    dispatch(showStatus);
    dispatch(loadStatus(url));
  }

  return (
    <div className="status__form-container">
      <form className="status__form" onSubmit={handleSubmit}>
        <label className="status__form-label">Is your site up or down?</label>
        <div className="status__form-inner-container">
          <TextField
            id="filled-basic"
            variant="filled"
            className="status__form-input"
            placeholder="Write your url here"
            name="url"
            required
            value={url}
            onChange={(event) => onFieldChange(event.target.value, setUrl)}
          />
          <Button
            variant="contained"
            color="primary"
            className="status__form-button"
            type="submit"
          >
            Check
          </Button>
        </div>
      </form>

      <section className="status__result">
        {!show ? (
          <></>
        ) : isLoading === true ? (
          <Spinner />
        ) : status === undefined ? (
          <h1>Sorry, that was an error, try again!</h1>
        ) : (
          <h1>Your website is {status.statusText}!</h1>
        )}
      </section>
    </div>
  );
};

export default Status;
