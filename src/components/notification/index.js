import "./notification.css";

function Notification ({noteIconSrc, noteCopy, noteIconSrcCopy}) {

  return (
    <div className="copy-success-overlay">
    <div className="message-container">
      <img
        className="panel-icon"
        src={noteIconSrc}
        alt={noteIconSrcCopy}
      />
      <p className="small-print">{noteCopy}</p>
    </div>
  </div>
  )
}

export default Notification;
