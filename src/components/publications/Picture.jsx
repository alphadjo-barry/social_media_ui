import {IoEyeSharp} from "react-icons/io5";
import React from "react";

export default function Picture({ index, pic, hiddenPicturesCount, handleSelectedPicture, selectedPictureUrl}) {
    return(<>
        <div key={index} style={{position: "relative"}}>

            <div className="d-flex flex-column p-2">
                <div>
                    <img
                        src={pic.picturePath}
                        alt="publication"
                        style={{
                            width: "220px",
                            height: "350px",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    />

                    {/* Badge +X si plus de 3 images */}
                    {index === 2 && hiddenPicturesCount > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                width: "220px",
                                height: "350px",
                                backgroundColor: "rgba(0,0,0,0.6)",
                                color: "white",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "22px",
                                fontWeight: "bold"
                            }}
                        >
                            +{hiddenPicturesCount}
                        </div>
                    )}
                </div>
                <div>
                    <span
                        className="badge bg-primary gap-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleSelectedPicture(pic.picturePath)}
                    >
                        voir <IoEyeSharp />
                    </span>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-0 d-flex justify-content-center align-items-center">
                            {selectedPictureUrl && (
                                <img
                                    src={selectedPictureUrl}
                                    alt="publication"
                                    style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>)
}