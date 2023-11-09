import React from "react";
import { baseImageUrl } from "../../../api/baseurl";

export default function SinglePhotoView({ handleClose, id, id2, imagePreview }) {

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50">
      <div className="relative max-w-2xl md:max-h-[400px] md:h-full w-full  m-auto bg-white rounded-lg md:rounded-3xl shadow-shadowbox p-5 sm:p-8">
        <button
          onClick={() => handleClose(false)}
          className="absolute top-1 right-1 md:top-5 md:right-5 text-xl max-[640px]:pl-6"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Close"><rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line></g></g></svg>
        </button>
        {/* {id === "" || id === undefined || id === null ?
          <div className="flex items-center justify-center h-full  ">
            <div className="w-1/2 p-2 md:p-3">
              <img src={`${baseImageUrl}/${imagePreview}`} className="w-full h-full object-contain object-center " />
            </div>
            <div className="w-1/2 p-2 md:p-3">
              <img src={id2.backside_card_photo} className="w-full h-full object-contain object-center" />
            </div>
          </div>
          :
          <div className="flex items-center justify-center h-full  ">
            <img src={id} className="w-full h-full object-contain object-center p-5" />
          </div>
        } */}
        <div className="w-full h-auto p-2 md:p-3">
          <img src={`${baseImageUrl}/${imagePreview}`} className="w-full h-full object-contain object-center " />
        </div>
      </div>
    </div>
  );
}
