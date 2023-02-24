import React from "react";
import "../view/PrinterSearchstyle.css";
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <>
            <div className="LoadingDiv">
                <div className="LoadingInnerDiv">
                    <h1 > <CircularProgress/> </h1>
                </div>
            </div>
        </>
    );
};

export default Loading;