import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root"); // Modal dışında hiçbir şeyi gösterme

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;

  const { urls, alt_description, user, likes } = image;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={urls.regular} alt={alt_description} className={styles.image} />
      <div className={styles.info}>
        <p><strong>Author:</strong> {user.name}</p>
        <p><strong>Likes:</strong> {likes}</p>
        {alt_description && <p><strong>Description:</strong> {alt_description}</p>}
      </div>
      <button onClick={onRequestClose} className={styles.closeBtn}>X</button>
    </ReactModal>
  );
}
