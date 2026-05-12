const ContactUs = () => {
  return (
    <div>
      <h1>Ra'edat Software Company W.L.L</h1>
      <p>
        Al Badaa Building Road 711, Block 207, Bldg 453, Flat 22 P.O. Box 3294
        Muharraq, Bahrain
      </p>

      <p>Email:support@raedat.online</p>

      <div>
        <form action="POST">
          <input type="text" placeholder="Enter your full name" />
          <input type="email" placeholder="Enter your email address" />
          <input type="number" placeholder="Phone Number" />
          <input type="text" placeholder="Subject of the message" />

          <textarea
            placeholder="Enter your message"
            id="bio"
            name="bio"
            oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"
            style="overflow:hidden; width: 100%; min-height: 50px; padding: 10px; resize: none;"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
