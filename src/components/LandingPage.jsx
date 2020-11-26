import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showStatus, hideStatus, loadStatus } from "../actions/statusActions";
import EnhancedTableLanding from "./EnhancedTableLanding";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import LoadStatusMessage from "./LoadStatusMessage";
import { useSelector } from "react-redux";
import { loadLandingList } from "../actions/landingListActions";


const LandingPage = () => {
  let [url, setUrl] = useState("");
  let dispatch = useDispatch();
  const loadStatusResponse = useSelector((state) => state.statusReducer.loadStatus);
  const show = useSelector((state) => state.statusReducer.showStatus);
  const landingList = useSelector((state) => state.landingListReducer.landingList);

  useEffect(() => {
    dispatch(loadLandingList());
  }, [dispatch]);
  

  function onFieldChange(value, setValue) {
    dispatch(hideStatus());
    setValue(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    dispatch(showStatus());
    dispatch(loadStatus(url));
  }
 
  return (
    <section className="center">
    <div className="status__form-container">
      <form className="status__form" onSubmit={handleSubmit}>
        <label className="status__form-label">
          Welcome to Caucana!
          <br />
          Is your site up or down?
        </label>
        <div className="status__form-inner-container">
          <TextField
            id="filled-basic"
            variant="filled"
            className="status__form-input"
            placeholder="Write any url here"
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
      <section id="status-message" className="status__result">
      <LoadStatusMessage
      show = {show} loadStatusResponse={loadStatusResponse} />
      </section>
      <p className="link-to-profile">
        Go to your <Link to="/profile">Profile</Link> and add up to 5 websites
        to follow their uptimes for free, with free monitoring and notifications
        if you want to.
      </p>
      <h3 className="landingTable__title">Analyzed websites:</h3>
      <EnhancedTableLanding landingList={landingList}/>
      <br></br>
    </div>
    </section>
  );
};

export default LandingPage;
