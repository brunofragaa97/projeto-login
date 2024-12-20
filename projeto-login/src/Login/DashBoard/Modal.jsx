import "../../../Styles/Login-Dashboard/Dashboard/Desktop/modal.css"

const Modal = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;


    return (
        <div
         className="modal-overlay"
         onClick={onClose}
         
         >
        <div className="container-modal" onClick={(e) => e.stopPropagation()}>Teste de conteudo</div>



        </div>

    )


}
export default Modal;