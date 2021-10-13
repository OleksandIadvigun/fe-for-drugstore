import React from "react";
import Loader from "react-loader-spinner";

const SpinnerInside =
    //    <div className="spinner-border  text-muted loadingForSpinner "
    // ></div>

    // <div className="spinner-border text-info  loading"></div>
    <div className="loadingInside">
        <Loader type="Bars" color="white" height={21} width={21} visible={90} />
    </div>


export default SpinnerInside ;