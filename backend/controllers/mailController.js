const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../schemas/user');
const Project = require('../schemas/project');
const {loginController}=require('./authController');
const {registerController}=require('./authController')
const CLIENT_ID = '374420548475-q6ckbe2ppf15ad0lem1hsbbu6p2ail0q.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//048J3te4v1pFXCgYIARAAGAQSNwF-L9IrO0CrxCmMbAp1cFcBSnqqI_7KcqspLWwQnbM5SbrHbEKdmst7LUj-vfxQ30x4BbviuVs';
const ACCESS_TOKEN='ya29.a0Ad52N39ZbA40lhtkwZrOR70_lMO18gJc1zCJ9aci_feoW5zMo9LNl2wAEGLTCdOclPNDhyG1oBaWyRgzb47fhbziHwj024t4iRJZM-1PY2Z0k1G60d6g9bV8TQOg9WiQGvU6oBYWd10N5-G7A-BjSj8H5dYIfeYWuQtoaCgYKARQSARISFQHGX2MiRj8KJMrze9e0Al-gZH7Ncg0171'
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



const sendEmail = async (email, message,temporaryPassword) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    logger: true,
    debug: true,
    auth: {
      type: "OAuth2",
      user: "swastik@ncompass.inc",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "swastik :)) <swastik@ncompass.inc>",
    to: email,
    subject: "Added as Collaborator",
    //text: message ,
    text: `Your temporary password is: ${temporaryPassword}`,
  };
  const result = await transport.sendMail(mailOptions);
  console.log(result);
  if (!result) {
    throw new Error("Email sending failed");
  }
};
// await sendEmail(req.body.email, req.body.message);
 // Assuming the file path is correct

exports.sendEmailController = async (req, res) => {
  try {
    const { email, message } = req.body;
    const tempPassword = generateTemporaryPassword();
    console.log("hello",tempPassword);
    // Call the sendEmail function with email and message from the request body
    await sendEmail(email, message,tempPassword);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

exports.checkProjectOwner = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
  console.log("project");
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the authenticated user is the owner of the project
      console.log("hht",project.createdBy.toString());
      console.log(req.user._id);
      const collaboratorIds = project.collaborators.map(collaborator => collaborator.toString());
      
      if (project.createdBy.toString() !==req.user._id.valueOf()) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
  
      next();
    } catch (error) {
      console.error('Error checking project owner:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.addCollaborator = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { email,message} = req.body;
      console.log("project");
      // Find the project by ID
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the user already exists in the database
      let user = await User.findOne({ email });
      if (!user) {
        // Generate a temporary password for the new user
        const tempPassword = generateTemporaryPassword();
  
        // Send email to the user with the temporary password
        await sendEmail(email,message, tempPassword);
        
        // Hash the temporary password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        user = new User({ email, password: hashedPassword });
        // Create a new user in the database
        //user = await registerController.signup({ body: { email, password: hashedPassword } });
        await user.save();
        res.status(200).json({ message: 'Temporary password sent to the user. Ask them to log in with it.' });
      }
  

else {
    // User already exists, add the collaborator's email to the collaborators array
    project.collaborators.push(email);
    await project.save();

    res.status(200).json({ message: 'Collaborator added successfully', project });
  }
} catch (error) {
  console.error('Error adding collaborator:', error);
  res.status(500).json({ error: 'Failed to add collaborator' });
}
};


function generateTemporaryPassword() {
    const length = 10;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let temporaryPassword = '';
    for (let i = 0; i < length; i++) {
      temporaryPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return temporaryPassword;
  }

 