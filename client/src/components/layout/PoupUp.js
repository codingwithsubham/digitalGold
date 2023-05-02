import React, { Fragment } from "react";

const PoupUp = ({ hdr, btns, desc, btnClicked, isModal }) => {
  return (
    <Fragment>
      {isModal ? (
        <div className="popup-bg">
          <div className="popup">
            <div className="popup-hdr">{hdr}</div>
            <div className="popup-desc">{desc}</div>
            <div className="popup-btns">
              {btns.map((item) => (
                <button
                  key={item}
                  className="btn popup"
                  onClick={() => btnClicked({ item, clicked: true })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-bg-sm">
          <div className="popup-sm">
            <div className="popup-sm-hdr">{hdr}</div>
            <div className="popup-sm-desc">{desc}</div>
            <div className="popup-sm-btns">
              {btns.map((item) => (
                <button
                  key={item}
                  className="btn popup-sm"
                  onClick={() => btnClicked({ item, clicked: true })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PoupUp;
