function verificationCodeTemplate(userName, code, type) {
  const action = type === "email" ? "alterar seu e-mail" : "alterar sua senha";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
      <h2 style="color: #2563eb; text-align: center;">🔐 Confirmação de Segurança</h2>
      <p>Olá <strong>${userName}</strong>,</p>
      <p>Você solicitou ${action} na sua conta LojaTec. Para confirmar, use o código abaixo:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #111827;">${code}</span>
      </div>
  
      <p style="color: #dc2626; font-weight: bold;">⚠️ Este código expira em 1 minuto.</p>
  
      <p style="font-size: 12px; color: #6b7280;">Se você não solicitou esta alteração, ignore este e-mail ou altere sua senha para manter sua conta segura.</p>
  
      <hr style="margin: 20px 0;">
      <p style="text-align: center; font-size: 12px; color: #9ca3af;">
        LojaTec © ${new Date().getFullYear()} • Este é um e-mail automático, não responda.
      </p>
    </div>`;
}

module.exports = { verificationCodeTemplate };
