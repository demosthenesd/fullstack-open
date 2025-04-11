const Notification = ({ message }) => {

    if (message === null || message === "") {
        return null
    }



    let type = "";

    (["Added", "updated", "deleted"].some(word => message.includes(word))) ? type = "success" : type = "error";



    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification   