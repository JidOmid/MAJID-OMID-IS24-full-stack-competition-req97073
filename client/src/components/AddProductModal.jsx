import AddProduct from "./AddProduct";

//modal container for AddProduct component
export default function AddProductModal({
  showAdd,
  setShowAdd,
  refreshList,
  setRefreshList,
}) {
  return (
    <div style={{display: showAdd ? "" : " none"}} className="modal">
      <button type="button" onClick={() => setShowAdd(false)} className="close">
        X
      </button>
      <div className="modal-content">
        <AddProduct
          refreshList={refreshList}
          setRefreshList={setRefreshList}
          setShowAdd={setShowAdd}
        />
      </div>
    </div>
  );
}
