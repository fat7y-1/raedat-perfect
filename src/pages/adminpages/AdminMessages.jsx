import React, { useEffect, useState } from "react"
import axios from "axios"
import "./AdminMessages.css"

const AdminMessages = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get("http://localhost:3000/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // غير المقروء فوق
      const sortedMessages = res.data.sort((a, b) =>
        a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1
      )

      setMessages(sortedMessages)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    )

    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token")

      await axios.delete(`http://localhost:3000/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMessages(messages.filter((msg) => msg._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const toggleRead = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token")

      const newStatus = !Boolean(currentStatus)

      await axios.put(
        `http://localhost:3000/contact/read/${id}`,
        {
          isRead: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const updatedMessages = messages.map((msg) =>
        msg._id === id ? { ...msg, isRead: newStatus } : msg
      )

      // غير المقروء فوق
      updatedMessages.sort((a, b) =>
        a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1
      )

      setMessages([...updatedMessages])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-messages-page">
      <div className="messages-container">
        <h1 className="messages-title">Contact Messages</h1>

        <div className="table-wrapper">
          <table className="messages-table">
            <thead>
              <tr>
                <th>Read</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={msg.isRead ? "read-row" : "unread-row"}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={Boolean(msg.isRead)}
                      onChange={() => toggleRead(msg._id, msg.isRead)}
                    />
                  </td>

                  <td>{msg.name}</td>

                  <td>{msg.email}</td>

                  <td>{msg.phone}</td>

                  <td>{msg.subject}</td>

                  <td className="message-cell">{msg.message}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-text">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminMessages
