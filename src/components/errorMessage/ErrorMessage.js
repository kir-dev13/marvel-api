import img from "./error.gif";

const ErrorMessage = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "contain",
                display: "block",
                heigth: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "250px",
            }}
        />
    );
};

export default ErrorMessage;
