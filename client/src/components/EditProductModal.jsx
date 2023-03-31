import EditProduct from "./EditProduct";

export default function EditProductModal({
  showEdit,
  setShowEdit,
  refreshList,
  setRefreshList,
  product,
}) {
  return (
    <div style={{display: showEdit ? "" : " none"}} className="modal">
      <button
        type="button"
        onClick={() => setShowEdit(false)}
        className="close"
      >
        X
      </button>
      <div className="modal-content">
        <EditProduct
          refreshList={refreshList}
          setRefreshList={setRefreshList}
          setShowEdit={setShowEdit}
          product={product}
        />
      </div>
    </div>
  );
}
