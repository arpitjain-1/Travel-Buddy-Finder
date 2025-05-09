export const showContactPage = (req, res) => {
res.render('pages/contact');
};

export const handleContactForm = (req, res) => {
const { name, email, phone, subject, message } = req.body;
console.log("Received contact form:", { name, email, phone, subject, message });

// Save to DB or send an email here

res.redirect('/contact'); // or render a thank-you page
};
  