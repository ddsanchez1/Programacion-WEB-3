import axios from "axios";

export const verifyHCaptcha = async (req, res, next) => {
  try {
    const { captchaToken } = req.body;
    if (!process.env.HCAPTCHA_SECRET_KEY) {
      return res.status(500).json({
        message: "HCAPTCHA_SECRET_KEY no configurada",
      });
    }
    
    if (!captchaToken) {
      return res.status(400).json({
        message: "Captcha requerido",
      });
    }

    const response = await axios.post(
      "https://hcaptcha.com/siteverify",
      new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY,
        response: captchaToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.data.success) {
      return res.status(400).json({
        message: "Captcha inválido",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error verificando captcha",
    });
  }
};
