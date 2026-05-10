// import { useState } from "react"
// import Client from "../services/api"

// const EditableSection = ({ data, user, onUpdate, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false)
//   const [form, setForm] = useState({ ...data })

//   const handleSave = async () => {
//     const res = await Client.put(`/content/${data._id}`, form)
//     onUpdate(res.data)
//     setIsEditing(false)
//   }

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure?")) {
//       await Client.delete(`/content/${data._id}`)
//       onDelete(data._id)
//     }
//   }

//   if (isEditing) {
//     return (
//       <div className="edit-card">
//         <input
//           value={form.header}
//           onChange={(e) => setForm({ ...form, header: e.target.value })}
//         />
//         <textarea
//           value={form.text}
//           onChange={(e) => setForm({ ...form, text: e.target.value })}
//         />
//         <button onClick={handleSave}>Save</button>
//         <button onClick={() => setIsEditing(false)}>Cancel</button>
//       </div>
//     )
//   }

//   return (
//     <div className="content-section">
//       <h1>{data.header}</h1>
//       <p>{data.text}</p>
//       {user?.admin && (
//         <div className="admin-controls">
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//           <button onClick={handleDelete} style={{ color: "red" }}>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default EditableSection
