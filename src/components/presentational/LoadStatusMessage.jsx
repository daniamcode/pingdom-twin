import React from "react";
import Spinner from "./Spinner";
import errorMessage from "../../scripts/errorMessage"

const LoadStatusMessage = ({ show, loadStatusResponse }) => {

  return(
  <>
  {!show ? (
    <></>
  ) : loadStatusResponse.isLoading === true ? (
    <Spinner />
  ) : loadStatusResponse.error?.response ? (
    <h1>
      {document.getElementById('status-message')?.classList.remove("status__initial", "status__up", "status__down")}
      {document.getElementById('status-message')?.classList.add("status__error")}
      {errorMessage(loadStatusResponse.error.response)}
    </h1>
  ) : loadStatusResponse?.response?.data?.status === 'UP' ? (
    <h1>
      {document.getElementById('status-message')?.classList.remove("status__initial", "status__error", "status__down")}
      {document.getElementById('status-message')?.classList.add("status__up")}
      {loadStatusResponse?.response?.data?.url} is {loadStatusResponse?.response?.data?.status}!
      <p className="status__delay">
        There was a delay of {loadStatusResponse?.response?.data?.delay} ms.
      </p>
    </h1>
  ) : loadStatusResponse?.response?.data?.status === 'DOWN' ? (
    <h1>
      {document.getElementById('status-message')?.classList.remove("status__initial", "status__error", "status__up")}
      {document.getElementById('status-message')?.classList.add("status__down")}
      {loadStatusResponse?.response?.data?.url} is {loadStatusResponse?.response?.data?.status}!
    </h1>
  ) : <></>}
  
  </>
  )}


export default LoadStatusMessage